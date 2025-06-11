import React from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import SourceLinkCard from '../components/SourceLinkCard';
import { Job, GroundingSource } from '../types';

interface HomePageProps {
  jobs: Job[];
  sources: GroundingSource[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  handleSearch: (query: string, location: string) => void;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  maxSuggestions: number;
  setMaxSuggestions: (value: number) => void;
  yearsOfExperience: string;
  setYearsOfExperience: (value: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  jobs,
  sources,
  isLoading,
  error,
  hasSearched,
  handleSearch,
  timeFilter,
  setTimeFilter,
  maxSuggestions,
  setMaxSuggestions,
  yearsOfExperience,
  setYearsOfExperience,
}) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-900 text-white selection:bg-sky-500 selection:text-white">
      <nav className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-400">SkillMatch AI ✨</h1>
          <div className="space-x-4">
            <a href="/" className="text-slate-300 hover:text-sky-400">Jobs</a>
            <a href="/resume-builder" className="text-slate-300 hover:text-sky-400">Resume Builder</a>
            <a href="/about" className="text-slate-300 hover:text-sky-400">About</a>
            <a href="/contact" className="text-slate-300 hover:text-sky-400">Contact</a>
          </div>
        </div>
      </nav>

      <header className="text-center my-8 md:my-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-400">
          SkillMatch AI ✨
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Discover your next career opportunity across all platforms.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} timeFilter={timeFilter} setTimeFilter={setTimeFilter} maxSuggestions={maxSuggestions} setMaxSuggestions={setMaxSuggestions} yearsOfExperience={yearsOfExperience} setYearsOfExperience={setYearsOfExperience} />

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="text-center text-red-400 my-6 p-4 bg-slate-800 border border-red-700 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="font-semibold text-lg mb-2">Search Failed</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && jobs.length === 0 && hasSearched && (
        <p className="text-center text-slate-400 my-8 text-lg">
          No jobs found for your query. Try different keywords or broaden your search.
        </p>
      )}

      {jobs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-sky-300 text-center sm:text-left">Job Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={`${job.jobTitle}-${job.company}-${index}`} job={job} />
            ))}
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-700">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-sky-300 text-center sm:text-left">Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((source, index) => (
              <SourceLinkCard key={`${source.uri}-${index}`} uri={source.uri} title={source.title} />
            ))}
          </div>
        </div>
      )}

      <footer className="text-center text-slate-500 py-8 mt-12 border-t border-slate-700 text-sm">
        Powered by SkillMatch AI. All information is AI-generated and should be verified.
      </footer>
    </div>
  );
};

export default HomePage; 