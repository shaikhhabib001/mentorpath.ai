const Chat = require('../models/Chat');
const AIService = require('../services/aiService');

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId, context = {} } = req.body;
    const startTime = Date.now();

    let chatSession;

    // Find or create chat session
    if (sessionId) {
      chatSession = await Chat.findOne({ sessionId });
    }

    if (!chatSession) {
      const newSessionId = Chat.generateSessionId();
      chatSession = new Chat({
        sessionId: newSessionId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        type: context.type || 'mixed',
        jobRole: context.jobRole,
        difficulty: context.difficulty || 'mid'
      });
    }

    // Add user message to session
    await chatSession.addMessage('user', message);

    // Get AI response
    const conversationHistory = chatSession.messages.slice(0, -1); // All messages except the last one (current user message)
    const aiResponse = await AIService.chatWithAI(
      message, 
      conversationHistory, 
      context
    );

    const responseTime = Date.now() - startTime;

    // Add AI response to session
    await chatSession.addMessage('assistant', aiResponse.response, {
      responseTime: responseTime,
      tokens: aiResponse.tokens
    });

    // Update session analytics
    chatSession.analytics.averageResponseTime = 
      ((chatSession.analytics.averageResponseTime || 0) * (chatSession.analytics.totalMessages - 1) + responseTime) / 
      chatSession.analytics.totalMessages;

    await chatSession.save();

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSession.sessionId,
        response: aiResponse.response,
        responseTime: responseTime,
        messageId: chatSession.messages[chatSession.messages.length - 1]._id
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing chat message'
    });
  }
};

exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await Chat.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        session: chatSession
      }
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat session'
    });
  }
};

exports.generateQuestions = async (req, res) => {
  try {
    const { role, level, count } = req.body;

    const questions = await AIService.generateInterviewQuestions(
      role || 'Software Developer',
      level || 'mid',
      count || 5
    );

    res.status(200).json({
      success: true,
      data: {
        questions
      }
    });
  } catch (error) {
    console.error('Generate questions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating interview questions'
    });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title, type, difficulty, jobRole } = req.body;

    const chatSession = await Chat.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    // Update allowed fields
    if (title) chatSession.title = title;
    if (type) chatSession.type = type;
    if (difficulty) chatSession.difficulty = difficulty;
    if (jobRole) chatSession.jobRole = jobRole;

    await chatSession.save();

    res.status(200).json({
      success: true,
      data: {
        session: chatSession
      }
    });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating chat session'
    });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await Chat.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    await Chat.findByIdAndDelete(chatSession._id);

    res.status(200).json({
      success: true,
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting chat session'
    });
  }
};