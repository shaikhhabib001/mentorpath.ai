import React, { createContext, useState, useContext, useEffect } from 'react'
import { authAPI, healthCheck } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [backendStatus, setBackendStatus] = useState('checking')

  // Check backend health on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await healthCheck()
        setBackendStatus('healthy')
      } catch (error) {
        console.error('Backend health check failed:', error)
        setBackendStatus('unhealthy')
      }
    }
    
    checkBackend()
  }, [])

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('mentorpath_token')
      if (token) {
        try {
          const response = await authAPI.getProfile()
          setUser(response.data.user)
        } catch (error) {
          console.error('Token validation failed:', error)
          localStorage.removeItem('mentorpath_token')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password })
      
      if (response.success) {
        const { token, data } = response
        localStorage.setItem('mentorpath_token', token)
        setUser(data.user)
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      
      if (response.success) {
        const { token, data } = response
        localStorage.setItem('mentorpath_token', token)
        setUser(data.user)
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('mentorpath_token')
    setUser(null)
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      
      if (response.success) {
        setUser(response.data.user)
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    backendStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}