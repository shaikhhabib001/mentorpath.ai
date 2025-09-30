const CV = require('../models/CV');
const AIService = require('../services/aiService');
const FileService = require('../services/fileService');
const path = require('path');

exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No CV file uploaded'
      });
    }

    const startTime = Date.now();
    
    // Extract text from file
    const extractedText = await FileService.extractTextFromFile(
      req.file.path,
      req.file.mimetype
    );

    if (!extractedText || extractedText.trim().length === 0) {
      await FileService.cleanupFile(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from the document. Please ensure it contains readable text.'
      });
    }

    // Analyze CV with AI
    const analysis = await AIService.analyzeCV(extractedText);
    const processingTime = Date.now() - startTime;

    // Generate session ID for this analysis
    const sessionId = CV.generateSessionId();

    // Create CV record
    const cvRecord = new CV({
      sessionId: sessionId,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      extractedText: extractedText,
      analysis: analysis,
      processingTime: processingTime,
      status: 'completed'
    });

    await cvRecord.save();

    // Generate recommendations and missing skills
    const enhancedAnalysis = await this.enhanceAnalysis(analysis, cvRecord._id);

    res.status(200).json({
      success: true,
      message: 'CV analyzed successfully',
      data: {
        sessionId: sessionId,
        cvId: cvRecord._id,
        analysis: enhancedAnalysis,
        processingTime: processingTime
      }
    });

  } catch (error) {
    console.error('CV upload error:', error);
    
    // Clean up uploaded file on error
    if (req.file) {
      await FileService.cleanupFile(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error processing CV'
    });
  }
};

exports.getCVAnalysis = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const cv = await CV.findOne({ sessionId });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV analysis not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        cv
      }
    });
  } catch (error) {
    console.error('Get CV analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching CV analysis'
    });
  }
};

exports.getSessionCVs = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const cvs = await CV.find({ sessionId })
      .sort({ analysisDate: -1 })
      .select('originalName analysisDate status analysis.summary');

    res.status(200).json({
      success: true,
      data: {
        cvs,
        count: cvs.length
      }
    });
  } catch (error) {
    console.error('Get session CVs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching CV history'
    });
  }
};

exports.deleteCVAnalysis = async (req, res) => {
  try {
    const { sessionId, cvId } = req.params;
    
    const cv = await CV.findOne({ 
      _id: cvId,
      sessionId 
    });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV analysis not found'
      });
    }

    // Delete file from filesystem
    await FileService.cleanupFile(cv.filePath);

    // Delete from database
    await CV.findByIdAndDelete(cvId);

    res.status(200).json({
      success: true,
      message: 'CV analysis deleted successfully'
    });
  } catch (error) {
    console.error('Delete CV analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting CV analysis'
    });
  }
};

// Helper method to enhance analysis with recommendations
async function enhanceAnalysis(analysis, cvId) {
  // This would typically involve more complex logic
  // For now, we'll add basic recommendations based on missing skills
  
  const commonSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'GraphQL'];
  const existingSkills = analysis.skills.map(skill => skill.name);
  const missingSkills = commonSkills.filter(skill => 
    !existingSkills.includes(skill)
  );

  const recommendations = missingSkills.map(skill => ({
    title: `Learn ${skill}`,
    description: `Develop your ${skill} skills to increase job opportunities`,
    type: 'course',
    priority: 'medium',
    duration: '4-6 weeks',
    level: 'beginner',
    resourceUrl: `https://example.com/learn-${skill.toLowerCase()}`
  }));

  return {
    ...analysis,
    missingSkills: missingSkills.map(skill => ({
      skill,
      demand: 'high',
      importance: 8,
      jobMatches: ['Frontend Developer', 'Full Stack Developer', 'Software Engineer']
    })),
    recommendations: recommendations.slice(0, 3),
    jobMatches: [
      {
        title: 'Full Stack Developer',
        matchPercentage: 75,
        reason: 'Matches most of your technical skills',
        salaryRange: { min: 80000, max: 120000 },
        companies: ['TechCorp', 'WebSolutions', 'StartUpInc']
      },
      {
        title: 'Frontend Developer',
        matchPercentage: 85,
        reason: 'Strong alignment with your frontend skills',
        salaryRange: { min: 70000, max: 110000 },
        companies: ['WebDev Inc', 'Digital Solutions', 'Creative Tech']
      }
    ]
  };
}