import React from 'react';
import { ParsedResumeContent, ThemeOptionValue, THEMES } from '../types';

interface ResumePreviewProps {
  content: ParsedResumeContent;
  theme: ThemeOptionValue;
}

const SectionTitle: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <h2 className={`text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 ${className || ''}`}>
    {title}
  </h2>
);

export const ResumePreview: React.FC<ResumePreviewProps> = ({ content, theme }) => {
  const selectedThemeDetails = THEMES.find(t => t.value === theme) || THEMES[0];
  const { personalDetails, summary, experience, education, skills, projects, certifications } = content;

  const baseTextClass = `${selectedThemeDetails.fontClass} text-gray-800 text-left`;
  const headingColor = 'text-gray-900';

  return (
    <div id="resume-preview-content-area" className={`p-8 ${selectedThemeDetails.backgroundColor} ${baseTextClass} shadow-lg print-friendly-resume max-w-[800px] mx-auto`}>
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{personalDetails.name}</h1>
        <div className="text-sm space-y-1">
          {personalDetails.email && (
            <p>e-mail: {personalDetails.email}</p>
          )}
          {personalDetails.phone && (
            <p>tel: {personalDetails.phone}</p>
          )}
          {personalDetails.linkedin && (
            <p>LinkedIn: {personalDetails.linkedin}</p>
          )}
          {personalDetails.website && (
            <p>Portfolio: {personalDetails.website}</p>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {summary && (
        <section className="mb-6">
          <SectionTitle title="Professional Summary" />
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Education and Qualifications" />
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree}{edu.major && `, ${edu.major}`}</h3>
                <p className="text-sm">{edu.year}</p>
              </div>
              <p className="italic">{edu.institution}</p>
              {edu.location && <p className="text-sm">{edu.location}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Work Experience" />
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm">{exp.dates}</p>
              </div>
              <p className="italic">{exp.company}</p>
              {exp.location && <p className="text-sm">{exp.location}</p>}
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="leading-snug">{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Projects" />
          {projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-sm">{proj.dates}</p>
              </div>
              <p className="italic">{proj.technologies.join(' • ')}</p>
              {proj.link && (
                <p className="text-sm">Link: {proj.link}</p>
              )}
              <p className="mt-2 text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Certifications" />
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm">{cert.date}</p>
              </div>
              <p className="italic">{cert.issuer}</p>
              {cert.link && (
                <p className="text-sm">Link: {cert.link}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section>
          <SectionTitle title="Skills" />
          <div className="mt-2">
            <p className="text-sm">{skills.join(' • ')}</p>
          </div>
        </section>
      )}
    </div>
  );
};