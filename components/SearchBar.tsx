import React, { useState } from 'react';
import { SEARCH_ICON_SVG } from '../constants';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  isLoading: boolean;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  maxSuggestions: number;
  setMaxSuggestions: (value: number) => void;
  yearsOfExperience: string;
  setYearsOfExperience: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, timeFilter, setTimeFilter, maxSuggestions, setMaxSuggestions, yearsOfExperience, setYearsOfExperience }) => {
  const [query, setQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="jobQuery" className="block text-sm font-medium text-sky-300 mb-1">
            Job Title, Keywords, or Company
          </label>
          <input
            type="text"
            id="jobQuery"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Software Engineer, Marketing Manager"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-slate-500 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="locationQuery" className="block text-sm font-medium text-sky-300 mb-1">
            Location (Optional)
          </label>
          <input
            type="text"
            id="locationQuery"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco, Remote"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-slate-500 text-white"
          />
        </div>
        <div>
          <label htmlFor="timeFilter" className="block text-sm font-medium text-sky-300 mb-1">
            Time Filter
          </label>
          <select
            id="timeFilter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-white"
          >
            <option value="all">All Time</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div>
          <label htmlFor="maxSuggestions" className="block text-sm font-medium text-sky-300 mb-1">
            Max Suggestions
          </label>
          <input
            type="number"
            id="maxSuggestions"
            value={maxSuggestions}
            onChange={(e) => setMaxSuggestions(Number(e.target.value))}
            min="1"
            max="50"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-white"
          />
        </div>
        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-sky-300 mb-1">
            Years of Experience
          </label>
          <select
            id="yearsOfExperience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-white"
          >
            <option value="any">Any</option>
            <option value="1">1+ years</option>
            <option value="3">3+ years</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="mt-6 w-full flex items-center justify-center p-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md transition-colors duration-150 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          <>
            {SEARCH_ICON_SVG}
            <span className="ml-2">Find Jobs</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SearchBar;
    