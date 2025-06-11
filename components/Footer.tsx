
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 text-center py-6">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} AI Resume Generator. Powered by Gemini.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Create amazing resumes with the power of AI.
        </p>
      </div>
    </footer>
  );
};
