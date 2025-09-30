import { useState, useCallback } from 'react';
import { jobsAPI } from '../utils/api';

export const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchJobs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await jobsAPI.getAll(filters);
      setJobs(result.data.jobs);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecommendedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await jobsAPI.getRecommended();
      setJobs(result.data.jobs);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await jobsAPI.getStats();
      setStats(result.data.stats);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchJobs = useCallback(async (query, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await jobsAPI.getAll({
        search: query,
        ...filters
      });
      setJobs(result.data.jobs);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    jobs,
    stats,
    fetchJobs,
    fetchRecommendedJobs,
    fetchJobStats,
    searchJobs,
    clearError: () => setError(null)
  };
};