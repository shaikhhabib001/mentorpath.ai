import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import SkillGap from '../components/skills/SkillGap'
import { ArrowLeft, Download, Share2 } from 'lucide-react'

const SkillGapPage = () => {
  const location = useLocation()
  const analysis = location.state?.analysis

  // Mock data for demonstration
  const mockAnalysis = {
    fileName: 'john_doe_cv.pdf',
    analysisDate: new Date().toLocaleDateString(),
    skills: {
      technical: ['JavaScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'MongoDB', 'Express.js'],
      soft: ['Communication', 'Team Leadership', 'Problem Solving', 'Agile Methodology']
    },
    missingSkills: ['TypeScript', 'AWS', 'Docker', 'GraphQL', 'Jest', 'Redis'],
    recommendations: [
      {
        title: 'Master TypeScript',
        description: 'Learn TypeScript fundamentals and advanced patterns to improve code quality',
        link: '#',
        type: 'course',
        duration: '4 weeks',
        level: 'Intermediate'
      },
      {
        title: 'AWS Cloud Practitioner',
        description: 'Understand cloud computing concepts and AWS core services',
        link: '#',
        type: 'certification',
        duration: '6 weeks',
        level: 'Beginner'
      },
      {
        title: 'Docker & Containerization',
        description: 'Learn container fundamentals and Docker best practices',
        link: '#',
        type: 'course',
        duration: '3 weeks',
        level: 'Intermediate'
      }
    ],
    jobMatches: [
      { title: 'Frontend Developer', match: 85 },
      { title: 'Full Stack Developer', match: 78 },
      { title: 'React Developer', match: 92 }
    ]
  }

  const displayAnalysis = analysis || mockAnalysis

  return (
    <div className="min-h-screen bg-mentor-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <Link 
              to="/upload-cv" 
              className="inline-flex items-center text-mentor-blue hover:text-mentor-teal transition mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload Another CV
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Skill Gap Analysis</h1>
            <p className="text-gray-600 mt-2">
              Analysis of <span className="font-semibold">{displayAnalysis.fileName}</span> • 
              Completed on {displayAnalysis.analysisDate}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="flex items-center px-4 py-2 bg-mentor-blue text-white rounded-lg hover:bg-[#2D4A9C] transition">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </button>
          </div>
        </div>

        {/* Job Match Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {displayAnalysis.jobMatches.map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-mentor-teal h-2 rounded-full transition-all duration-500"
                    style={{ width: `${job.match}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">{job.match}%</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {job.match >= 80 ? 'Strong match' : job.match >= 60 ? 'Good match' : 'Consider upskilling'}
              </p>
            </div>
          ))}
        </div>

        {/* Skill Gap Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SkillGap skillsData={displayAnalysis} />
        </div>

        {/* Action Section */}
        <div className="bg-gradient-to-r from-mentor-blue to-mentor-teal rounded-xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready to Close Your Skill Gaps?</h2>
              <p className="opacity-90">Start your personalized learning journey today</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/interview-prep" 
                className="bg-white text-mentor-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Practice Interview
              </Link>
              <Link 
                to="/jobs" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-mentor-blue transition"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillGapPage