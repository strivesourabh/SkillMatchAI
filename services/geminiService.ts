import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Job, GroundingSource, ContentCandidate, GroundingChunk } from '../types';

// Ensure API_KEY is accessed this way. The build/runtime environment must provide it.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // This error will be caught by the calling function if thrown during module load,
  // but it's better to let the API call fail and handle it there.
  // For now, just log a warning if it's not present at module load time.
  console.warn("API_KEY environment variable is not set. Gemini API calls will likely fail.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" }); // Pass a placeholder if missing to avoid constructor error, API call will fail.

function parseJsonSafely(jsonString: string): Job[] {
  let parsableJson = jsonString.trim();
  
  // Remove potential markdown fences (```json ... ``` or ``` ... ```)
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = parsableJson.match(fenceRegex);
  if (match && match[2]) {
    parsableJson = match[2].trim();
  }

  // Sometimes AI might return non-JSON text before or after.
  // Try to extract JSON array specifically.
  const arrayRegex = /\[\s*\{[\s\S]*?\}\s*\]/;
  const arrayMatch = parsableJson.match(arrayRegex);
  if (arrayMatch && arrayMatch[0]) {
    parsableJson = arrayMatch[0];
  } else if (!parsableJson.startsWith('[')) {
    // If no array found and doesn't start with [, it's likely not the JSON we want
    console.warn("Response does not appear to be a JSON array:", jsonString);
    return [];
  }

  try {
    const parsed = JSON.parse(parsableJson);
    if (Array.isArray(parsed)) {
      // Basic validation of job structure can be added here if needed
      return parsed.filter(item => item && typeof item.jobTitle === 'string' && typeof item.company === 'string');
    }
    return [];
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini:", e);
    console.error("Original non-JSON response string:", jsonString); // Log the problematic string
    throw new Error("AI response was not in the expected format. Could not parse job data.");
  }
}


export const searchJobs = async (query: string, location: string, timeFilter: string, maxSuggestions: number, yearsOfExperience: string): Promise<{ jobs: Job[], sources: GroundingSource[] }> => {
  const model = "gemini-2.5-flash-preview-04-17"; // Use specified model

  const locationPreamble = location ? ` in or relevant to location: '${location}'` : '';
  const timeFilterPreamble = timeFilter !== 'all' ? ` posted within the last ${timeFilter}` : '';
  const locationRadiusPreamble = location ? ` within a 50-mile radius of '${location}'` : '';
  const experiencePreamble = yearsOfExperience !== 'any' ? ` requiring ${yearsOfExperience} years of experience` : '';

  const prompt = `
You are an expert AI job finder. Your task is to find relevant job postings based on the user's query: '${query}'${locationPreamble}${timeFilterPreamble}${locationRadiusPreamble}${experiencePreamble}.
Please respond with a JSON array of job objects directly in your text. Do not add any introductory text before the JSON array or any explanatory text after it.
The JSON array should strictly follow this structure:
[
  {
    "jobTitle": "string",
    "company": "string",
    "location": "string (city, state, or 'Remote')",
    "description": "string (a concise summary of responsibilities and key requirements, ideally 2-3 sentences, max 300 characters)",
    "platform": "string (e.g., LinkedIn, Indeed, Company Website, etc.)",
    "applyLink": "string_or_null (direct link to the job posting if available, otherwise null. Validate if it's a real URL.)"
  }
]
If no jobs are found, return an empty JSON array []. Limit results to a maximum of ${maxSuggestions} jobs.
Use Google Search to find the most up-to-date job postings from various platforms.
Ensure the information is accurate and directly related to actual job opportunities.
Prioritize jobs with specific locations if provided, or remote jobs if 'remote' is mentioned.
Make descriptions concise and informative.
Ensure the response is a valid JSON array. Any deviation from this format will result in an error.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [{role: "user", parts: [{text: prompt}]}],
      config: {
        tools: [{ googleSearch: {} }],
        // As per guidelines, DO NOT add responseMimeType: "application/json" when using googleSearch.
      },
    });

    const responseText = response.text;
    let jobs: Job[] = [];
    if (responseText) {
      jobs = parseJsonSafely(responseText);
    } else {
      console.warn("Gemini response text is empty.");
    }
    
    const candidate = response.candidates?.[0] as ContentCandidate | undefined;
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks ?? [];
    
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: GroundingChunk) => chunk.web && chunk.web.uri)
      .map((chunk: GroundingChunk) => ({
        uri: chunk.web!.uri, // We filtered for chunk.web.uri existence
        title: chunk.web!.title || chunk.web!.uri, // Use URI as fallback title
      }));

    return { jobs, sources };

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
      throw new Error("API Key is not valid or missing. Please ensure it's correctly configured in your environment.");
    }
    if (error.message && error.message.toLowerCase().includes('quota')) {
        throw new Error('API quota exceeded. Please try again later or check your quota limits.');
    }
    // For other errors, rethrow a more generic message or the original one.
    throw new Error(error.message || "Failed to fetch jobs from AI service.");
  }
};
    