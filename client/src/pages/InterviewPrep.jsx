import React from 'react'
import Chatbot from '../components/interview/Chatbot'
import { MessageSquare, Users, Target, Clock } from 'lucide-react'

const InterviewPrep = () => {
  const interviewTips = [
    {
      icon: Target,
      title: 'Set Clear Goals',
      description: 'Define what you want to achieve from each practice session.'
    },
    {
      icon: Users,
      title: 'Practice Regularly',
      description: 'Consistent practice builds confidence and improves responses.'
    },
    {
      icon: Clock,
      title: 'Time Your Answers',
      description: 'Aim for 2-3 minute responses to common questions.'
    }
  ]

  const commonQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work for our company?",
    "Where do you see yourself in 5 years?",
    "How do you handle pressure and tight deadlines?",
    "Describe a challenging project and how you approached it."
  ]

  return (
    <div className="min-h-screen bg-mentor-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Interview Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with our intelligent AI coach. Get instant feedback on your responses, 
            improve your communication skills, and build confidence for real interviews.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Chatbot />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-mentor-teal" />
                Interview Tips
              </h3>
              <div className="space-y-4">
                {interviewTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-mentor-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <tip.icon className="w-4 h-4 text-mentor-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Questions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Common Interview Questions
              </h3>
              <div className="space-y-3">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-mentor-teal hover:bg-mentor-teal/5 transition text-sm text-gray-700"
                    onClick={() => {
                      // This would typically populate the chat input
                      console.log('Question selected:', question)
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-gradient-to-br from-mentor-blue to-mentor-teal rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Sessions Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Rating</span>
                  <span className="font-semibold">4.2/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Response Time</span>
                  <span className="font-semibold">Improved 35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewPrep