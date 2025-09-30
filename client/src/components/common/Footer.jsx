import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Mail, Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-mentor-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-8 h-8 bg-mentor-teal rounded-lg flex items-center justify-center mr-3">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">MentorPath</span>
            </Link>
            <p className="text-gray-300 max-w-md">
              Your AI-powered career mentor platform. Get personalized career guidance, 
              skill gap analysis, and interview preparation to accelerate your professional growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/upload-cv" className="text-gray-300 hover:text-white transition">CV Analysis</Link></li>
              <li><Link to="/skill-gap" className="text-gray-300 hover:text-white transition">Skill Gap</Link></li>
              <li><Link to="/interview-prep" className="text-gray-300 hover:text-white transition">Interview Prep</Link></li>
              <li><Link to="/jobs" className="text-gray-300 hover:text-white transition">Job Search</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Ready to advance your career?<br />
              Start with MentorPath today.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-gray-300 text-sm">
          <p>&copy; 2024 MentorPath. All rights reserved. Built with ❤️ by Shaikh Habib.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer