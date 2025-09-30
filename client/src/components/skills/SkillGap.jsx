import React from 'react'
import { TrendingUp, Clock, BookOpen } from 'lucide-react'

const SkillGap = ({ skillsData }) => {
  const { skills, missingSkills, recommendations } = skillsData

  return (
    <div className="space-y-8">
      {/* Current Skills */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          Your Current Skills
        </h3>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Technical Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((skill, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Soft Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.soft.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-3 h-3 bg-mentor-gold rounded-full mr-2"></div>
          Skills to Develop
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mt-3 text-sm">
          These skills are in high demand for your target roles. Focus on learning them to increase your job prospects.
        </p>
      </div>

      {/* Learning Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-mentor-teal" />
          Personalized Learning Path
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-mentor-teal pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority} priority
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {rec.duration}
                </span>
                <span className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {rec.level}
                </span>
                <a href={rec.link} className="text-mentor-teal hover:underline font-medium">
                  Start Learning →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillGap