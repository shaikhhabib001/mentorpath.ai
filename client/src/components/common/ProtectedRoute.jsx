import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading, backendStatus } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mentor-gray">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mentor-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (backendStatus === 'unhealthy') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mentor-gray">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Unavailable</h2>
          <p className="text-gray-600 mb-4">
            Our backend services are currently unavailable. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-mentor-teal text-white px-6 py-2 rounded-lg hover:bg-[#0EA271] transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute