export interface Job {
  jobTitle: string;
  company: string;
  location: string;
  description: string;
  platform: string;
  applyLink?: string | null;
}

export interface GroundingSource {
  uri: string;
  title?: string;
}

// Define a minimal structure for what we expect from GroundingChunk's web part
// This aligns with @google/genai's GroundingChunk.web property.
export interface WebChunk {
  uri: string;
  title?: string;
}

export interface GroundingChunk {
  web?: WebChunk;
  retrievedContext?: { // Placeholder for other types if ever needed
    uri: string;
    title?: string;
  };
  // Other properties of GroundingChunk are omitted for simplicity unless needed
}

// Define a minimal structure for Candidate to access groundingMetadata
// This aligns with @google/genai's ContentCandidate
export interface ContentCandidate {
  groundingMetadata?: {
    groundingChunks?: GroundingChunk[];
    // Other grounding metadata properties
  };
  // Other candidate properties
}
    



// resume types

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
}

export interface Education {
  id: string;
  degree: string;
  major: string;
  institution: string;
  location: string;
  graduationYear: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string; // User's initial summary / objective
  experience: WorkExperience[];
  education: Education[];
  skills: string; // Comma-separated string
  projects: Project[];
  certifications: Certification[];
}

export interface ThemeOption {
  value: ThemeOptionValue;
  label: string;
  description: string; // For prompting Gemini
  fontClass: string;
  primaryColor: string; // e.g. text-blue-600
  secondaryColor: string; // e.g. text-gray-700
  backgroundColor: string; // e.g. bg-white
  headingClass?: string;
  sectionTitleClass?: string;
  borderColor?: string;
}

export type ThemeOptionValue = 'modern' | 'classic' | 'creative' | 'technical' | 'professional' | 'minimalist' | 'executive' | 'contemporary';

export const THEMES: ThemeOption[] = [
  { 
    value: 'modern',
    label: 'Modern',
    description: "clean, concise, and results-oriented language, focusing on clarity and impact",
    fontClass: 'font-sans', 
    primaryColor: 'text-sky-600', 
    secondaryColor: 'text-slate-700',
    backgroundColor: 'bg-white',
    headingClass: 'text-3xl font-bold',
    sectionTitleClass: 'text-xl font-semibold border-b-2 border-sky-500 pb-1 mb-3',
    borderColor: 'border-slate-200'
  },
  { 
    value: 'classic',
    label: 'Classic',
    description: "traditional, formal, and achievement-focused language, with a timeless and elegant feel",
    fontClass: 'font-serif',
    primaryColor: 'text-gray-800',
    secondaryColor: 'text-gray-600',
    backgroundColor: 'bg-white',
    headingClass: 'text-3xl font-normal',
    sectionTitleClass: 'text-xl font-medium border-b border-gray-400 pb-1 mb-3',
    borderColor: 'border-gray-300'
  },
  {
    value: 'creative',
    label: 'Creative',
    description: "engaging, unique, and project-showcasing language, with a touch of personality and flair",
    fontClass: 'font-sans',
    primaryColor: 'text-purple-600',
    secondaryColor: 'text-slate-600',
    backgroundColor: 'bg-white', // Or a very light pastel
    headingClass: 'text-3xl font-bold tracking-tight',
    sectionTitleClass: 'text-xl font-semibold text-purple-500 pb-1 mb-3',
    borderColor: 'border-purple-200'
  },
  {
    value: 'technical',
    label: 'Technical',
    description: "precise, data-driven, and skill-focused language, highlighting technical expertise and problem-solving abilities",
    fontClass: 'font-mono',
    primaryColor: 'text-blue-700',
    secondaryColor: 'text-slate-800',
    backgroundColor: 'bg-white',
    headingClass: 'text-2xl font-semibold',
    sectionTitleClass: 'text-lg font-medium uppercase tracking-wider border-b border-blue-300 pb-1 mb-3',
    borderColor: 'border-blue-200'
  },
  {
    value: 'professional',
    label: 'Professional',
    description: "polished, corporate, and leadership-focused language, emphasizing strategic thinking and business acumen",
    fontClass: 'font-sans',
    primaryColor: 'text-emerald-700',
    secondaryColor: 'text-gray-700',
    backgroundColor: 'bg-white',
    headingClass: 'text-2xl font-bold tracking-tight',
    sectionTitleClass: 'text-lg font-semibold border-b-2 border-emerald-500 pb-1 mb-3',
    borderColor: 'border-emerald-100'
  },
  {
    value: 'minimalist',
    label: 'Minimalist',
    description: "clean, focused, and essential language, highlighting core achievements with elegant simplicity",
    fontClass: 'font-sans',
    primaryColor: 'text-neutral-900',
    secondaryColor: 'text-neutral-600',
    backgroundColor: 'bg-white',
    headingClass: 'text-2xl font-light tracking-wide',
    sectionTitleClass: 'text-lg font-normal border-b border-neutral-200 pb-1 mb-3',
    borderColor: 'border-neutral-100'
  },
  {
    value: 'executive',
    label: 'Executive',
    description: "authoritative, strategic, and results-driven language, showcasing leadership and business impact",
    fontClass: 'font-sans',
    primaryColor: 'text-indigo-700',
    secondaryColor: 'text-gray-700',
    backgroundColor: 'bg-white',
    headingClass: 'text-2xl font-bold',
    sectionTitleClass: 'text-lg font-semibold border-b-2 border-indigo-500 pb-1 mb-3',
    borderColor: 'border-indigo-100'
  },
  {
    value: 'contemporary',
    label: 'Contemporary',
    description: "modern, dynamic, and innovative language, emphasizing adaptability and forward-thinking",
    fontClass: 'font-sans',
    primaryColor: 'text-rose-600',
    secondaryColor: 'text-slate-700',
    backgroundColor: 'bg-white',
    headingClass: 'text-2xl font-bold tracking-tight',
    sectionTitleClass: 'text-lg font-semibold border-b-2 border-rose-400 pb-1 mb-3',
    borderColor: 'border-rose-100'
  }
];

export interface ParsedWorkExperience {
  title: string;
  company: string;
  location?: string;
  dates: string; // e.g., YYYY-MM - YYYY-MM or YYYY-MM - Present
  responsibilities: string[];
}

export interface ParsedEducation {
  degree: string;
  major?: string;
  institution: string;
  location?: string;
  year: string; // graduation year
}

export interface ParsedProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  dates: string; // e.g., YYYY-MM - YYYY-MM or YYYY-MM - Present
}

export interface ParsedCertification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ParsedResumeContent {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: ParsedWorkExperience[];
  education: ParsedEducation[];
  skills: string[];
  projects: ParsedProject[];
  certifications: ParsedCertification[];
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  website: '',
  summary: '',
  experience: [
    { id: 'exp1', jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' }
  ],
  education: [
    { id: 'edu1', degree: '', major: '', institution: '', location: '', graduationYear: '' }
  ],
  skills: '',
  projects: [
    { id: 'proj1', name: '', description: '', technologies: '', startDate: '', endDate: '', isCurrent: false }
  ],
  certifications: [
    { id: 'cert1', name: '', issuer: '', date: '' }
  ]
};
 
export interface GeminiResumeResponse {
  summary: string;
  experience: ParsedWorkExperience[];
  education: ParsedEducation[];
  skills: string[];
  projects: ParsedProject[];
  certifications: ParsedCertification[];
}
