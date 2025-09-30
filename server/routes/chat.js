const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Send message to chat
router.post('/message', chatController.sendMessage);

// Generate interview questions
router.post('/questions/generate', chatController.generateQuestions);

// Get chat session by ID
router.get('/sessions/:sessionId', chatController.getSession);

// Update chat session
router.put('/sessions/:sessionId', chatController.updateSession);

// Delete chat session
router.delete('/sessions/:sessionId', chatController.deleteSession);

module.exports = router;