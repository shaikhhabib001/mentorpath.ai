import React from 'react';
import { CheckCircle, AlertCircle, Clock, FileText, Download } from 'lucide-react';

const CVAnalyzer = ({ analysis, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mentor-teal mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your CV</h3>
        <p className="text-gray-600">Our AI is extracting skills and identifying opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button className="bg-mentor-teal text-white px-6 py-2 rounded-lg hover:bg-[#0EA271] transition">
          Try Again
        </button>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Available</h3>
        <p className="text-gray-600">Upload your CV to get started with the analysis.</p>
      </div>
    );
  }

  const { skills, experience, education, summary, confidence } = analysis;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-mentor-blue to-mentor-teal p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">CV Analysis Complete</h2>
            <p className="opacity-90">Comprehensive analysis of your skills and experience</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{confidence}%</div>
            <div className="text-sm opacity-90">Confidence Score</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-1000"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        {summary && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Professional Summary
            </h3>
            <p className="text-blue-800 text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-mentor-teal mr-2" />
            Skills Identified
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Technical Skills */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-mentor-teal text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                    {skill.confidence > 80 && (
                      <span className="ml-1 text-xs">✓</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-mentor-blue text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        {experience && experience.roles && experience.roles.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-mentor-gold mr-2" />
              Professional Experience
            </h3>
            
            <div className="space-y-4">
              {experience.roles.map((role, index) => (
                <div key={index} className="border-l-4 border-mentor-gold pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{role.title}</h4>
                      <p className="text-gray-600">{role.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {role.duration}
                    </span>
                  </div>
                  {role.years && (
                    <p className="text-sm text-gray-500 mt-1">
                      {role.years} year{role.years !== 1 ? 's' : ''} of experience
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {experience.totalYears && (
              <div className="mt-4 p-3 bg-mentor-gold/10 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Total Experience:</strong> {experience.totalYears} year{experience.totalYears !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  {edu.year && (
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                      {edu.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4 border-t border-gray-200">
          <button className="flex-1 bg-mentor-teal text-white py-3 rounded-lg font-semibold hover:bg-[#0EA271] transition flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </button>
          <button className="flex-1 border border-mentor-blue text-mentor-blue py-3 rounded-lg font-semibold hover:bg-mentor-blue hover:text-white transition">
            Share Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzer;