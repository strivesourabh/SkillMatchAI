import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ResumeData, ThemeOptionValue, GeminiResumeResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not found. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, error handled by check or user informed
const modelName = 'gemini-2.5-flash-preview-04-17';

function parseGeminiResponse(responseText: string): GeminiResumeResponse | null {
  let jsonStr = responseText.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s; // Matches ```json ... ``` or ``` ... ```
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }

  try {
    const parsedData = JSON.parse(jsonStr);
    // Basic validation of the parsed structure
    if (parsedData && 
        typeof parsedData.summary === 'string' && 
        Array.isArray(parsedData.experience) && 
        Array.isArray(parsedData.education) && 
        Array.isArray(parsedData.skills) &&
        Array.isArray(parsedData.projects) &&
        Array.isArray(parsedData.certifications)) {
      return parsedData as GeminiResumeResponse;
    }
    console.error("Parsed JSON does not match expected GeminiResumeResponse structure:", parsedData);
    return null;
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini:", e);
    console.error("Original response text:", responseText); // Log the problematic text
    return null;
  }
}


export const generateResumeContentGemini = async (
  userData: ResumeData,
  themeName: ThemeOptionValue,
  themeDescription: string
): Promise<GeminiResumeResponse | null> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
You are an expert resume writer. Based on the following user-provided data, generate compelling content for a professional resume.
The user wants a resume with a "${themeName}" feel, which means ${themeDescription}. Adapt your language and tone accordingly.

User Data:
Full Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone}
LinkedIn: ${userData.linkedin || 'N/A'}
Website: ${userData.website || 'N/A'}
Initial Summary/Objective: ${userData.summary}

Work Experience:
${userData.experience.map(exp => `  - Job Title: ${exp.jobTitle}\n    Company: ${exp.company}\n    Location: ${exp.location || 'N/A'}\n    Dates: ${exp.startDate} to ${exp.isCurrent ? 'Present' : exp.endDate}\n    Responsibilities (user input): ${exp.responsibilities}`).join('\n\n')}

Education:
${userData.education.map(edu => `  - Degree: ${edu.degree}\n    Major: ${edu.major || 'N/A'}\n    Institution: ${edu.institution}\n    Location: ${edu.location || 'N/A'}\n    Graduation Year: ${edu.graduationYear}`).join('\n\n')}

Projects:
${userData.projects.map(proj => `  - Name: ${proj.name}\n    Technologies: ${proj.technologies}\n    Dates: ${proj.startDate} to ${proj.isCurrent ? 'Present' : proj.endDate}\n    Link: ${proj.link || 'N/A'}\n    Description: ${proj.description}`).join('\n\n')}

Certifications:
${userData.certifications.map(cert => `  - Name: ${cert.name}\n    Issuer: ${cert.issuer}\n    Date: ${cert.date}\n    Link: ${cert.link || 'N/A'}`).join('\n\n')}

Skills (user input): ${userData.skills}

Please generate the following sections for the resume:
1.  **Professional Summary**: A concise and impactful summary based on the user's input and overall profile.
2.  **Work Experience**: For each job, rewrite the user-provided responsibilities into 2-4 impactful bullet points using action verbs. Focus on achievements and quantifiable results if possible based on the input.
3.  **Education**: Format the education details clearly and professionally.
4.  **Projects**: For each project, create a compelling description highlighting the technologies used and key achievements.
5.  **Certifications**: List all certifications with their issuing organizations and dates.
6.  **Skills**: Organize the user's skills into a relevant list. You can categorize them if appropriate (e.g., Technical Skills, Soft Skills), or present a combined list.

Return the output ONLY as a JSON object with the following exact structure (do not add any explanations before or after the JSON block):
{
  "summary": "string",
  "experience": [
    { "title": "string", "company": "string", "location": "string" (optional, use from input), "dates": "string (e.g., YYYY-MM - YYYY-MM or YYYY-MM - Present, derive from input)", "responsibilities": ["string - bullet point 1", "string - bullet point 2"] }
  ],
  "education": [
    { "degree": "string", "major": "string" (optional, use from input), "institution": "string", "location": "string" (optional, use from input), "year": "string (graduation year, from input)" }
  ],
  "projects": [
    { "name": "string", "description": "string", "technologies": ["string - tech 1", "string - tech 2"], "dates": "string (e.g., YYYY-MM - YYYY-MM or YYYY-MM - Present, derive from input)", "link": "string (optional, use from input)" }
  ],
  "certifications": [
    { "name": "string", "issuer": "string", "date": "string (use from input)", "link": "string (optional, use from input)" }
  ],
  "skills": ["string - skill 1", "string - skill 2"]
}

Ensure all dates are formatted consistently (e.g., "MM/YYYY - MM/YYYY" or "MM/YYYY - Present").
For experience responsibilities and project descriptions, use strong action verbs.
The entire response must be a single JSON object.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json", // Request JSON output
        temperature: 0.6, // Slightly creative but still factual
        topP: 0.9,
        topK: 40,
      }
    });

    const responseText = response.text;
    if (!responseText) {
        console.error("Gemini API returned an empty response text.");
        throw new Error("Gemini API returned an empty response.");
    }
    
    return parseGeminiResponse(responseText);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific error messages that indicate API key issues
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
            throw new Error("Invalid Gemini API Key. Please check your API_KEY environment variable.");
        }
         // Check for quota issues
        if (error.message.includes("quota") || error.message.includes("Rate limit exceeded")) {
            throw new Error("Gemini API quota exceeded. Please check your usage or try again later.");
        }
    }
    throw error; // Re-throw other errors
  }
};
