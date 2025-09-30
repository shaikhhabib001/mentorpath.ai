import { useState, useCallback } from 'react';
import { cvAPI } from '../utils/api';

export const useCVAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadCV = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('cv', file);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const result = await cvAPI.upload(formData);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(result.data.analysis);
      
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  const getAnalysis = useCallback(async (cvId) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await cvAPI.getAnalysis(cvId);
      setAnalysis(result.data.cv.analysis);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserCVs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await cvAPI.getUserCVs();
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    analysis,
    progress,
    uploadCV,
    getAnalysis,
    getUserCVs,
    clearError
  };
};