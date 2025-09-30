const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    responseTime: Number, // in milliseconds
    tokens: Number
  }
});

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'New Interview Practice'
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'mixed', 'custom'],
    default: 'mixed'
  },
  jobRole: String,
  company: String,
  difficulty: {
    type: String,
    enum: ['junior', 'mid', 'senior', 'executive'],
    default: 'mid'
  },
  messages: [messageSchema],
  settings: {
    maxResponseTime: {
      type: Number,
      default: 300000 // 5 minutes in milliseconds
    },
    enableFeedback: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  analytics: {
    totalMessages: {
      type: Number,
      default: 0
    },
    averageResponseTime: Number,
    sessionDuration: Number // in milliseconds
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
// chatSchema.index({ sessionId: 1 });
chatSchema.index({ createdAt: -1 });

// Virtual for last message
chatSchema.virtual('lastMessage').get(function() {
  return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
});

// Method to add message
chatSchema.methods.addMessage = function(role, content, metadata = {}) {
  this.messages.push({
    role,
    content,
    metadata,
    timestamp: new Date()
  });
  this.analytics.totalMessages = this.messages.length;
  return this.save();
};

// Static method to generate session ID
chatSchema.statics.generateSessionId = function() {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

module.exports = mongoose.model('Chat', chatSchema);