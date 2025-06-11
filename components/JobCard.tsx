
import React from 'react';
import { Job } from '../types';
import { EXTERNAL_LINK_SVG } from '../constants';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col h-full hover:shadow-sky-500/30 transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-sky-400 mb-2">{job.jobTitle}</h3>
      <p className="text-slate-300 mb-1">
        <span className="font-medium">Company:</span> {job.company || 'N/A'}
      </p>
      <p className="text-slate-300 mb-1">
        <span className="font-medium">Location:</span> {job.location || 'N/A'}
      </p>
      <p className="text-slate-400 text-sm mb-1">
        <span className="font-medium text-slate-300">Platform:</span> {job.platform || 'N/A'}
      </p>
      <p className="text-slate-400 text-sm mt-3 mb-4 flex-grow leading-relaxed">{job.description || 'No description available.'}</p>
      {job.applyLink && (
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block text-sm text-sky-400 hover:text-sky-300 font-medium transition-colors group"
        >
          Apply Now {EXTERNAL_LINK_SVG}
        </a>
      )}
       {!job.applyLink && (
        <p className="mt-auto text-sm text-slate-500 italic">No direct apply link provided.</p>
      )}
    </div>
  );
};

export default JobCard;
    