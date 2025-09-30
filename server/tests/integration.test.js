const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API Endpoints', () => {
  let authToken;
  let testUserId;

  // Authentication removed: skipping auth endpoint tests

  describe('CV endpoints', () => {
    it('should get user CVs', async () => {
      const response = await request(app)
        .get('/api/cv');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.cvs).toBeInstanceOf(Array);
    });
  });

  describe('Chat endpoints', () => {
    it('should send a chat message', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({
          message: 'Hello, I need help with interview preparation'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.sessionId).toBeDefined();
    });
  });

  describe('Job endpoints', () => {
    it('should get jobs list', async () => {
      const response = await request(app)
        .get('/api/jobs');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.jobs).toBeInstanceOf(Array);
    });
  });
});