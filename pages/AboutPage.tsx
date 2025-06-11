import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-900 text-white selection:bg-sky-500 selection:text-white">
      <Navbar />

      <header className="text-center my-8 md:my-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-400">
          About Us
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Learn more about our mission and vision.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-slate-300">
          Welcome to SkillMatch AI, where we connect talented individuals with their dream jobs. Our mission is to leverage AI technology to provide accurate and relevant job listings, helping you find the perfect career opportunity.
        </p>
        <p className="text-lg text-slate-300 mt-4">
          We are committed to ensuring that all information provided is accurate and up-to-date. Our team works tirelessly to improve the user experience and provide the best possible service.
        </p>
      </div>

      <footer className="text-center text-slate-500 py-8 mt-12 border-t border-slate-700 text-sm">
        Powered by SkillMatch AI. All information is AI-generated and should be verified.
      </footer>
    </div>
  );
};

export default AboutPage; 