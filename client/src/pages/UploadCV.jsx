import React from 'react';
import { useNavigate } from 'react-router-dom';
import CVUpload from '../components/cv/CVUpload';
import CVAnalyzer from '../components/cv/CVAnalyzer';
import { useCVAnalysis } from '../hooks/useCVAnalysis';
import { Upload, FileText, Shield, Zap } from 'lucide-react';

const UploadCV = () => {
  const { loading, error, progress, uploadCV, analysis, clearError } = useCVAnalysis();
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    try {
      clearError();
      const result = await uploadCV(file);
      
      // Navigate to skill gap page with analysis data
      navigate('/skill-gap', { 
        state: { 
          analysis: result.analysis,
          cvId: result.cvId 
        } 
      });
    } catch (err) {
      // Error is already handled by the hook
      console.error('Upload failed:', err);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your CV is processed securely and deleted after analysis. We never share your data.'
    },
    {
      icon: FileText,
      title: 'Smart Analysis',
      description: 'AI-powered extraction of skills, experience, and education from your CV.'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get personalized recommendations and skill gap analysis in seconds.'
    }
  ];

  return (
    <div className="min-h-screen bg-mentor-gray py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your CV for AI Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant AI-powered feedback on your resume. Discover skill gaps, 
            receive personalized recommendations, and accelerate your career growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <CVUpload 
                onFileUpload={handleFileUpload}
                loading={loading}
                progress={progress}
                error={error}
              />
            </div>

            {/* Analysis Preview */}
            {analysis && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Preview</h2>
                <CVAnalyzer analysis={analysis} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-mentor-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="w-4 h-4 text-mentor-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Best Results</h3>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• Use a text-based PDF (not scanned)</li>
                <li>• Include detailed project descriptions</li>
                <li>• List all relevant skills and technologies</li>
                <li>• Mention years of experience for key skills</li>
                <li>• Include education and certifications</li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-mentor-teal rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">?</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-3">
                Having trouble with your CV upload?
              </p>
              <button className="text-mentor-teal text-sm font-medium hover:underline">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCV;