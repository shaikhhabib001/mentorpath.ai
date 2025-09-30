import { useState, useCallback, useRef } from 'react';
import { chatAPI } from '../utils/api';

export const useChatbot = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(async (message, context = {}) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await chatAPI.sendMessage(message, sessionId, context);
      
      const botMessage = {
        id: Date.now() + 1,
        text: result.data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setSessionId(result.data.sessionId);

      return result.data;
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was cancelled
      }
      
      setError(err.message);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
      throw err;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [sessionId]);

  const generateQuestions = useCallback(async (role, level = 'mid', count = 5) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await chatAPI.generateQuestions(role, level, count);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSession = useCallback(async (sessionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await chatAPI.getSession(sessionId);
      setMessages(result.data.session.messages || []);
      setSessionId(sessionId);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    messages,
    sessionId,
    sendMessage,
    generateQuestions,
    loadSession,
    clearChat,
    cancelRequest,
    clearError: () => setError(null)
  };
};