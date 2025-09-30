import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Landing from './pages/Landing';
import UploadCV from './pages/UploadCV';
import SkillGap from './pages/SkillGap';
import InterviewPrep from './pages/InterviewPrep';
import Jobs from './pages/Jobs';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-mentor-gray">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/upload-cv" element={<UploadCV />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/jobs" element={<Jobs />} />
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a 
        href="/" 
        className="bg-mentor-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0EA271] transition"
      >
        Return Home
      </a>
    </div>
  </div>
);

export default App;