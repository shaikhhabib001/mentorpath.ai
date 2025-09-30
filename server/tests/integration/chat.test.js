const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/User');
const Chat = require('../../models/Chat');

let mongoServer;
let authToken;

describe('Chat API Integration Tests', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Create test user and login
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
  });

  describe('POST /api/chat/message', () => {
    it('should send a message and get response', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({
          message: 'Hello, can you help me with interview preparation?'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('sessionId');
      expect(response.body.data).toHaveProperty('response');
    });

    it('should maintain conversation context', async () => {
      // Send first message
      const firstResponse = await request(app)
        .post('/api/chat/message')
        .send({
          message: 'I need help with React questions'
        });

      const sessionId = firstResponse.body.data.sessionId;

      // Send follow-up message
      const secondResponse = await request(app)
        .post('/api/chat/message')
        .send({
          message: 'What about state management?',
          sessionId: sessionId
        });

      expect(secondResponse.status).toBe(200);
      expect(secondResponse.body.data.sessionId).toBe(sessionId);
    });
  });
});