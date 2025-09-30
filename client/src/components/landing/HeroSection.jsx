import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-mentor-blue to-[#2D4A9C] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-mentor-gold fill-current" />
              <span className="text-sm font-medium">Trusted by 10,000+ professionals</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your AI-Powered
              <span className="block text-mentor-teal bg-gradient-to-r from-mentor-teal to-mentor-gold bg-clip-text text-transparent">
                Career Mentor
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Get personalized career guidance, skill gap analysis, and interview preparation 
              to accelerate your professional growth with MentorPath.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-mentor-teal" />
                <span className="font-semibold">10K+</span>
                <span className="text-gray-300">Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-mentor-gold" />
                <span className="font-semibold">85%</span>
                <span className="text-gray-300">Career Growth</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/upload-cv" 
                className="group bg-mentor-teal hover:bg-[#0EA271] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border-2 border-white text-white hover:bg-white hover:text-mentor-blue font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
              <span>Trusted by professionals at</span>
              <div className="flex items-center space-x-4 opacity-80">
                <span className="font-semibold">Google</span>
                <span>•</span>
                <span className="font-semibold">Microsoft</span>
                <span>•</span>
                <span className="font-semibold">Amazon</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              {/* Mock Dashboard Preview */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-mentor-teal rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Skill Analysis Complete</h3>
                    <p className="text-sm text-gray-600">3 new opportunities found</p>
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Frontend Development</span>
                      <span>92% match</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-mentor-teal h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Full Stack</span>
                      <span>85% match</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-mentor-blue h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Technical Leadership</span>
                      <span>78% match</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-mentor-gold h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <div className="flex-1 bg-mentor-teal/10 text-mentor-teal text-center py-2 rounded-lg text-sm font-medium">
                      View Analysis
                    </div>
                    <div className="flex-1 bg-mentor-blue/10 text-mentor-blue text-center py-2 rounded-lg text-sm font-medium">
                      See Jobs
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-mentor-teal rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-mentor-gold rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-6 w-4 h-4 bg-mentor-blue rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-12 text-white" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;