import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'CV Analysis', href: '/upload-cv', current: location.pathname === '/upload-cv' },
    { name: 'Skill Gap', href: '/skill-gap', current: location.pathname === '/skill-gap' },
    { name: 'Interview Prep', href: '/interview-prep', current: location.pathname === '/interview-prep' },
    { name: 'Jobs', href: '/jobs', current: location.pathname === '/jobs' },
  ]

  return (
    <header className="bg-mentor-blue shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-mentor-teal rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white text-xl font-semibold">MentorPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  item.current
                    ? 'text-white bg-mentor-teal'
                    : 'text-gray-300 hover:text-white hover:bg-mentor-blue/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center">
            <Link to="/" className="bg-mentor-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0EA271] transition duration-300 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Account
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-mentor-blue/95 border-t border-mentor-blue/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                    item.current
                      ? 'text-white bg-mentor-teal'
                      : 'text-gray-300 hover:text-white hover:bg-mentor-blue/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-mentor-blue/50">
                <Link to="/" className="w-full bg-mentor-teal text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-[#0EA271] transition duration-300 flex items-center justify-center">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header