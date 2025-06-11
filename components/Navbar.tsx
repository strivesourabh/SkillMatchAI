import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-400">SkillMatch AI ✨</h1>
        <div className="space-x-4">
          <Link to="/" className="text-slate-300 hover:text-sky-400">Jobs</Link>
          <Link to="/resume-builder" className="text-slate-300 hover:text-sky-400">Resume Builder</Link>
          <Link to="/about" className="text-slate-300 hover:text-sky-400">About</Link>
          <Link to="/contact" className="text-slate-300 hover:text-sky-400">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 