import React, { useState, useCallback, ChangeEvent } from 'react';
import { ResumeData, WorkExperience, Education, Project, Certification } from '../types';
import { PlusCircleIcon, TrashIcon, BriefcaseIcon, AcademicCapIcon, UserCircleIcon, LinkIcon, DevicePhoneMobileIcon, EnvelopeIcon, SparklesIcon, IdentificationIcon, CodeBracketIcon, AwardIcon } from './Icons';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = "text", required = false, icon, disabled = false }) => (
  <div className="mb-4">
    <label htmlFor={name} className={`block text-sm font-medium mb-1 flex items-center ${disabled ? 'text-slate-400' : 'text-sky-200'}`}>
      {icon && <span className="mr-2 w-5 h-5">{icon}</span>}
      {label} {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
        required={required}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
        required={required}
        disabled={disabled}
      />
    )}
  </div>
);


export const ResumeForm: React.FC<{ initialData: ResumeData; onChange: (data: ResumeData) => void; onSubmit: () => void; isLoading: boolean; }> = ({ initialData, onChange, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ResumeData>(initialData);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const handleExperienceChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    setFormData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = { 
        ...newExperience[index], 
        [name]: type === 'checkbox' ? checked : value 
      };
      if (name === 'isCurrent' && checked) {
        newExperience[index].endDate = 'Present';
      } else if (name === 'isCurrent' && !checked && newExperience[index].endDate === 'Present') {
         newExperience[index].endDate = '';
      }
      const newData = { ...prev, experience: newExperience };
      onChange(newData);
      return newData;
    });
  }, [onChange]);
  

  const addExperience = useCallback(() => {
    setFormData(prev => {
      const newExp: WorkExperience = { id: `exp${Date.now()}`, jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' };
      const newData = { ...prev, experience: [...prev.experience, newExp] };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const removeExperience = useCallback((index: number) => {
    setFormData(prev => {
      const newExperience = prev.experience.filter((_, i) => i !== index);
      const newData = { ...prev, experience: newExperience };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const handleEducationChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [name]: value };
      const newData = { ...prev, education: newEducation };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const addEducation = useCallback(() => {
    setFormData(prev => {
      const newEdu: Education = { id: `edu${Date.now()}`, degree: '', major: '', institution: '', location: '', graduationYear: '' };
      const newData = { ...prev, education: [...prev.education, newEdu] };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const removeEducation = useCallback((index: number) => {
    setFormData(prev => {
      const newEducation = prev.education.filter((_, i) => i !== index);
      const newData = { ...prev, education: newEducation };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const handleProjectChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    setFormData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { 
        ...newProjects[index], 
        [name]: type === 'checkbox' ? checked : value 
      };
      if (name === 'isCurrent' && checked) {
        newProjects[index].endDate = 'Present';
      } else if (name === 'isCurrent' && !checked && newProjects[index].endDate === 'Present') {
        newProjects[index].endDate = '';
      }
      const newData = { ...prev, projects: newProjects };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const addProject = useCallback(() => {
    setFormData(prev => {
      const newProj: Project = { 
        id: `proj${Date.now()}`, 
        name: '', 
        description: '', 
        technologies: '', 
        startDate: '', 
        endDate: '', 
        isCurrent: false 
      };
      const newData = { ...prev, projects: [...prev.projects, newProj] };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const removeProject = useCallback((index: number) => {
    setFormData(prev => {
      const newProjects = prev.projects.filter((_, i) => i !== index);
      const newData = { ...prev, projects: newProjects };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const handleCertificationChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = { ...newCertifications[index], [name]: value };
      const newData = { ...prev, certifications: newCertifications };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const addCertification = useCallback(() => {
    setFormData(prev => {
      const newCert: Certification = { 
        id: `cert${Date.now()}`, 
        name: '', 
        issuer: '', 
        date: '' 
      };
      const newData = { ...prev, certifications: [...prev.certifications, newCert] };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const removeCertification = useCallback((index: number) => {
    setFormData(prev => {
      const newCertifications = prev.certifications.filter((_, i) => i !== index);
      const newData = { ...prev, certifications: newCertifications };
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><UserCircleIcon className="w-6 h-6 mr-2" />Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Jane Doe" required icon={<IdentificationIcon />} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. jane.doe@example.com" required icon={<EnvelopeIcon />} />
            <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g. (123) 456-7890" icon={<DevicePhoneMobileIcon />} />
            <InputField label="LinkedIn Profile URL" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="e.g. linkedin.com/in/janedoe" icon={<LinkIcon />} />
            <InputField label="Portfolio/Website URL" name="website" value={formData.website} onChange={handleChange} placeholder="e.g. janedoe.com" icon={<LinkIcon />} />
        </div>
      </div>
      
      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><SparklesIcon className="w-6 h-6 mr-2" />Professional Summary</h3>
        <InputField 
          label="Summary/Objective" 
          name="summary" 
          type="textarea" 
          value={formData.summary} 
          onChange={handleChange} 
          placeholder="Briefly describe your career goals and key qualifications. AI will help refine this!" 
        />
      </div>

      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><BriefcaseIcon className="w-6 h-6 mr-2" />Work Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={exp.id} className="mb-6 p-4 border border-slate-600 rounded-md relative">
            {formData.experience.length > 1 && (
              <button type="button" onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} placeholder="e.g. Software Engineer" required/>
                <InputField label="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="e.g. Tech Solutions Inc." required/>
                <InputField label="Location" name="location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} placeholder="e.g. San Francisco, CA" />
                <InputField label="Start Date" name="startDate" type="month" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} required/>
                <InputField label="End Date" name="endDate" type={exp.isCurrent ? "text" : "month"} value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} disabled={exp.isCurrent} required={!exp.isCurrent}/>
            </div>
            <div className="mt-2">
                <label className="flex items-center text-sm text-slate-300">
                    <input type="checkbox" name="isCurrent" checked={exp.isCurrent} onChange={(e) => handleExperienceChange(index, e)} className="mr-2 h-4 w-4 rounded border-slate-500 text-sky-500 focus:ring-sky-400"/>
                    I currently work here
                </label>
            </div>
            <InputField 
              label="Responsibilities/Achievements" 
              name="responsibilities" 
              type="textarea" 
              value={exp.responsibilities} 
              onChange={(e) => handleExperienceChange(index, e)} 
              placeholder="Describe your key tasks and accomplishments. Use bullet points or short paragraphs. AI will help structure this." 
              required
            />
          </div>
        ))}
        <button type="button" onClick={addExperience} className="mt-2 flex items-center text-sky-400 hover:text-sky-300 font-medium py-2 px-4 rounded-md bg-sky-700/30 hover:bg-sky-600/40 transition-colors">
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Experience
        </button>
      </div>

      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><AcademicCapIcon className="w-6 h-6 mr-2" />Education</h3>
        {formData.education.map((edu, index) => (
          <div key={edu.id} className="mb-6 p-4 border border-slate-600 rounded-md relative">
            {formData.education.length > 1 && (
               <button type="button" onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="Degree" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. B.S. Computer Science" required/>
                <InputField label="Major" name="major" value={edu.major} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. Software Engineering" />
                <InputField label="Institution" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. University of Technology" required/>
                <InputField label="Location" name="location" value={edu.location} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. New York, NY" />
                <InputField label="Graduation Year" name="graduationYear" type="text" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. 2020 or Expected 2025" required/>
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="mt-2 flex items-center text-sky-400 hover:text-sky-300 font-medium py-2 px-4 rounded-md bg-sky-700/30 hover:bg-sky-600/40 transition-colors">
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Education
        </button>
      </div>

      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><CodeBracketIcon className="w-6 h-6 mr-2" />Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={proj.id} className="mb-6 p-4 border border-slate-600 rounded-md relative">
            {formData.projects.length > 1 && (
              <button type="button" onClick={() => removeProject(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="Project Name" name="name" value={proj.name} onChange={(e) => handleProjectChange(index, e)} placeholder="e.g. E-commerce Platform" required/>
              <InputField label="Technologies Used" name="technologies" value={proj.technologies} onChange={(e) => handleProjectChange(index, e)} placeholder="e.g. React, Node.js, MongoDB" required/>
              <InputField label="Start Date" name="startDate" type="month" value={proj.startDate} onChange={(e) => handleProjectChange(index, e)} required/>
              <InputField label="End Date" name="endDate" type={proj.isCurrent ? "text" : "month"} value={proj.endDate} onChange={(e) => handleProjectChange(index, e)} disabled={proj.isCurrent} required={!proj.isCurrent}/>
              <InputField label="Project Link" name="link" value={proj.link || ''} onChange={(e) => handleProjectChange(index, e)} placeholder="e.g. github.com/username/project" />
            </div>
            <div className="mt-2">
              <label className="flex items-center text-sm text-slate-300">
                <input type="checkbox" name="isCurrent" checked={proj.isCurrent} onChange={(e) => handleProjectChange(index, e)} className="mr-2 h-4 w-4 rounded border-slate-500 text-sky-500 focus:ring-sky-400"/>
                Currently working on this project
              </label>
            </div>
            <InputField 
              label="Project Description" 
              name="description" 
              type="textarea" 
              value={proj.description} 
              onChange={(e) => handleProjectChange(index, e)} 
              placeholder="Describe your project, its purpose, and your role. AI will help structure this." 
              required
            />
          </div>
        ))}
        <button type="button" onClick={addProject} className="mt-2 flex items-center text-sky-400 hover:text-sky-300 font-medium py-2 px-4 rounded-md bg-sky-700/30 hover:bg-sky-600/40 transition-colors">
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Project
        </button>
      </div>

      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><AwardIcon className="w-6 h-6 mr-2" />Certifications</h3>
        {formData.certifications.map((cert, index) => (
          <div key={cert.id} className="mb-6 p-4 border border-slate-600 rounded-md relative">
            {formData.certifications.length > 1 && (
              <button type="button" onClick={() => removeCertification(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="Certification Name" name="name" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} placeholder="e.g. AWS Certified Solutions Architect" required/>
              <InputField label="Issuing Organization" name="issuer" value={cert.issuer} onChange={(e) => handleCertificationChange(index, e)} placeholder="e.g. Amazon Web Services" required/>
              <InputField label="Date Earned" name="date" type="month" value={cert.date} onChange={(e) => handleCertificationChange(index, e)} required/>
              <InputField label="Certificate Link" name="link" value={cert.link || ''} onChange={(e) => handleCertificationChange(index, e)} placeholder="e.g. credential.net/verify/123456" />
            </div>
          </div>
        ))}
        <button type="button" onClick={addCertification} className="mt-2 flex items-center text-sky-400 hover:text-sky-300 font-medium py-2 px-4 rounded-md bg-sky-700/30 hover:bg-sky-600/40 transition-colors">
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Certification
        </button>
      </div>

      <div className="p-6 bg-slate-700/50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-sky-300 mb-4 flex items-center"><SparklesIcon className="w-6 h-6 mr-2" />Skills</h3>
        <InputField 
          label="Skills" 
          name="skills" 
          type="textarea" 
          value={formData.skills} 
          onChange={handleChange} 
          placeholder="List your skills, separated by commas (e.g., JavaScript, React, Node.js, Project Management). AI will help organize these." 
        />
      </div>

      <div className="mt-8 text-center">
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full md:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
            <SparklesIcon className="w-5 h-5 mr-2" /> Generate Resume
            </>
          )}
        </button>
      </div>
    </form>
  );
};