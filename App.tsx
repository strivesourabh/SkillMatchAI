import React, { useState, useCallback } from 'react';
import { Job, GroundingSource } from './types';
import { searchJobs } from './services/geminiService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [maxSuggestions, setMaxSuggestions] = useState<number>(10);
  const [yearsOfExperience, setYearsOfExperience] = useState<string>('any');

  const handleSearch = useCallback(async (query: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setJobs([]);
    setSources([]);
    setHasSearched(true);

    try {
      const result = await searchJobs(query, location, timeFilter, maxSuggestions, yearsOfExperience);
      setJobs(result.jobs);
      setSources(result.sources);
    } catch (err: any) {
      console.error("Search error:", err);
      if (err.message && err.message.includes('API key not valid')) {
        setError("API Key is not valid or missing. Please ensure it's correctly configured in your environment.");
      } else if (err.message && err.message.includes('Quota exceeded')) {
        setError("API quota exceeded. Please try again later.");
      } 
      else {
        setError(err.message || "An unexpected error occurred while fetching jobs.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [timeFilter, maxSuggestions, yearsOfExperience]);

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/" element={
          <HomePage
            jobs={jobs}
            sources={sources}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            handleSearch={handleSearch}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            maxSuggestions={maxSuggestions}
            setMaxSuggestions={setMaxSuggestions}
            yearsOfExperience={yearsOfExperience}
            setYearsOfExperience={setYearsOfExperience}
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
    