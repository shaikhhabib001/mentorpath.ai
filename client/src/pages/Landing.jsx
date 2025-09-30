import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import { Upload, Target, MessageSquare, Briefcase, Shield, Zap, Users } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Upload,
      title: 'CV Analysis',
      description: 'Get instant AI-powered feedback on your resume and identify areas for improvement.',
      color: 'bg-mentor-teal'
    },
    {
      icon: Target,
      title: 'Skill Gap Detection',
      description: 'Discover missing skills compared to your dream job requirements.',
      color: 'bg-mentor-gold'
    },
    {
      icon: MessageSquare,
      title: 'AI Interview Prep',
      description: 'Practice with our intelligent chatbot and receive personalized feedback.',
      color: 'bg-mentor-blue'
    },
    {
      icon: Briefcase,
      title: 'Job Matching',
      description: 'Find opportunities that align with your skills and career goals.',
      color: 'bg-mentor-teal'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Your data is encrypted and never shared with third parties.'
    },
    {
      icon: Zap,
      title: 'Fast Analysis',
      description: 'Get comprehensive insights in seconds, not hours.'
    },
    {
      icon: Users,
      title: 'Expert Backed',
      description: 'Our AI is trained on insights from career experts and hiring managers.'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MentorPath Transforms Careers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From resume analysis to job placement, we guide you through every step of your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 group hover:transform hover:scale-105 transition duration-300">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-mentor-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MentorPath?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-mentor-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-mentor-blue" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-mentor-teal mb-2">10K+</div>
              <div className="text-gray-600">Professionals Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mentor-blue mb-2">85%</div>
              <div className="text-gray-600">Career Growth Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mentor-gold mb-2">92%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mentor-teal mb-2">2.5x</div>
              <div className="text-gray-600">Faster Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mentor-blue to-mentor-teal text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of professionals who have accelerated their career growth with MentorPath
          </p>
          <Link 
            to="/upload-cv" 
            className="bg-white text-mentor-blue font-semibold py-4 px-8 rounded-lg text-lg transition duration-300 inline-flex items-center hover:bg-gray-100 hover:scale-105 transform"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;