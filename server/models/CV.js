const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['programming', 'framework', 'tool', 'language', 'soft', 'other'],
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  years: {
    type: Number,
    min: 0,
    default: 0
  }
});

const recommendationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['course', 'book', 'tutorial', 'project', 'certification'],
    default: 'course'
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  duration: String,
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  resourceUrl: String,
  cost: {
    type: String,
    enum: ['free', 'paid', 'freemium'],
    default: 'free'
  }
});

const cvSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  storedName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  analysis: {
    skills: [skillSchema],
    experience: {
      totalYears: Number,
      roles: [{
        title: String,
        company: String,
        duration: String,
        years: Number
      }]
    },
    education: [{
      degree: String,
      institution: String,
      year: Number
    }],
    summary: String,
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  missingSkills: [{
    skill: String,
    demand: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    importance: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    },
    jobMatches: [String]
  }],
  recommendations: [recommendationSchema],
  jobMatches: [{
    title: String,
    matchPercentage: Number,
    reason: String,
    salaryRange: {
      min: Number,
      max: Number
    },
    companies: [String]
  }],
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  processingTime: Number, // in milliseconds
  analysisDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
cvSchema.index({ sessionId: 1, analysisDate: -1 });
cvSchema.index({ 'analysis.skills.name': 1 });
cvSchema.index({ status: 1 });

// Virtual for formatted file size
cvSchema.virtual('formattedFileSize').get(function() {
  const bytes = this.fileSize;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Static method to generate session ID
cvSchema.statics.generateSessionId = function() {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

module.exports = mongoose.model('CV', cvSchema);