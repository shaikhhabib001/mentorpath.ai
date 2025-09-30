import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Target, MessageSquare, Briefcase } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
      current: location.pathname === '/'
    },
    { 
      name: 'CV Analysis', 
      href: '/upload-cv', 
      icon: Upload,
      current: location.pathname === '/upload-cv'
    },
    { 
      name: 'Skill Gap', 
      href: '/skill-gap', 
      icon: Target,
      current: location.pathname === '/skill-gap'
    },
    { 
      name: 'Interview Prep', 
      href: '/interview-prep', 
      icon: MessageSquare,
      current: location.pathname === '/interview-prep'
    },
    { 
      name: 'Jobs', 
      href: '/jobs', 
      icon: Briefcase,
      current: location.pathname === '/jobs'
    },
  ];

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${
              item.current
                ? 'bg-mentor-teal text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;