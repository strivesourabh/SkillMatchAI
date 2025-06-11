import React, { useState, useCallback } from 'react';
import { ResumeData, ThemeOptionValue, ParsedResumeContent, THEMES, DEFAULT_RESUME_DATA } from '../types';
import { ResumeForm } from '../components/ResumeForm';
import { ThemeSelector } from '../components/ThemeSelector';
import { ResumePreview } from '../components/ResumePreview';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { InfoIcon, AlertTriangleIcon, DownloadIcon } from '../components/Icons';
import { generateResumeContentGemini } from '../services/resumeService';
import Navbar from '../components/Navbar';

// Ensure html2pdf is declared for TypeScript if using it globally from a CDN script
declare const html2pdf: any;

const ResumeBuilderPage: React.FC = () => {
  const [formData, setFormData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOptionValue>(THEMES[0].value);
  const [generatedResume, setGeneratedResume] = useState<ParsedResumeContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleFormChange = useCallback((newFormData: ResumeData) => {
    setFormData(newFormData);
  }, []);

  const handleThemeChange = useCallback((themeValue: ThemeOptionValue) => {
    setSelectedTheme(themeValue);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedResume(null);
    setShowPreview(false);

    try {
      const themeObject = THEMES.find(t => t.value === selectedTheme);
      const themeDescription = themeObject ? themeObject.description : "a professional style";
      
      const content = await generateResumeContentGemini(formData, selectedTheme, themeDescription);
      
      if (content) {
          setGeneratedResume({
            personalDetails: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              linkedin: formData.linkedin,
              website: formData.website,
            },
            summary: content.summary,
            experience: content.experience,
            education: content.education,
            skills: content.skills,
            projects: content.projects,
            certifications: content.certifications,
          });
          setShowPreview(true);
      } else {
        setError("Failed to generate resume content. The AI returned an unexpected response.");
      }
    } catch (e: any) {
      console.error("Error generating resume:", e);
      setError(`An error occurred: ${e.message || 'Unknown error'}. Please check your API key and network connection.`);
    } finally {
      setIsLoading(false);
    }
  }, [formData, selectedTheme]);

  const handleDownloadPDF = useCallback(async () => {
    if (!generatedResume) return;
    setIsDownloading(true);

    const element = document.getElementById('resume-preview-content-area');
    if (!element) {
      setError("Could not find resume content to download.");
      setIsDownloading(false);
      return;
    }

    const themeObject = THEMES.find(t => t.value === selectedTheme);
    const themeLabel = themeObject ? themeObject.label : selectedTheme;
    const filename = `${formData.fullName.replace(/\s+/g, '_') || 'Resume'}_${themeLabel}.pdf`;

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right in inches
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (pdfError: any) {
      console.error("Error generating PDF:", pdfError);
      setError(`Failed to generate PDF: ${pdfError.message || 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }

  }, [generatedResume, formData.fullName, selectedTheme]);


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-900 text-white selection:bg-sky-500 selection:text-white">
      <Navbar />

      <header className="text-center my-8 md:my-12">
        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-sky-400 mb-6">Create Your Resume</h2>
              <ThemeSelector
                themes={THEMES}
                selectedTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
              <ResumeForm
                initialData={formData}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-sky-400">Preview</h2>
                {showPreview && generatedResume && (
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading || isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="w-5 h-5 mr-2" /> Download PDF
                      </>
                    )}
                  </button>
                )}
              </div>

              {isLoading && (
                <div className="flex flex-col items-center justify-center h-96 bg-slate-700 rounded-lg p-6">
                  <LoadingSpinner />
                  <p className="mt-4 text-lg text-sky-300">Generating your resume... this may take a moment.</p>
                </div>
              )}
              {error && (
                <div className="bg-red-700 border border-red-500 text-red-100 px-4 py-3 rounded-lg relative flex items-start" role="alert">
                  <AlertTriangleIcon className="w-6 h-6 mr-3 text-red-300"/>
                  <div>
                    <strong className="font-bold">Operation Failed!</strong>
                    <span className="block sm:inline"> {error}</span>
                  </div>
                </div>
              )}
              {!isLoading && !error && !generatedResume && !showPreview && (
                <div className="flex flex-col items-center justify-center h-96 bg-slate-700 rounded-lg p-6 text-center">
                  <InfoIcon className="w-16 h-16 text-sky-500 mb-4" />
                  <p className="text-xl text-sky-300">Your generated resume will appear here.</p>
                  <p className="text-slate-400">Fill in your details and click "Generate Resume" to see the magic happen!</p>
                </div>
              )}
              {showPreview && generatedResume && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                   <ResumePreview content={generatedResume} theme={selectedTheme} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default ResumeBuilderPage;