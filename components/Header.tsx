
import React from 'react';
import { DocumentTextIcon } from './Icons'; // Assuming you have an icon for logo

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-2xl font-bold text-sky-400">
            <DocumentTextIcon className="w-8 h-8 mr-3 text-sky-500" />
            <span>AI Resume Generator</span>
          </div>
          {/* Optional: Add navigation links here if needed */}
        </div>
      </div>
    </header>
  );
};
