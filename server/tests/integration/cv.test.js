const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/User');
const CV = require('../../models/CV');

let mongoServer;
let authToken;
let testUser;

describe('CV API Integration Tests', () => {
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
    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      profession: 'Software Developer'
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    await CV.deleteMany({});
  });

  describe('POST /api/cv/upload', () => {
    it('should upload and analyze a CV successfully', async () => {
      const response = await request(app)
        .post('/api/cv/upload')
        .attach('cv', 'tests/fixtures/sample-cv.pdf');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('cvId');
      expect(response.body.data.analysis).toHaveProperty('skills');
      expect(response.body.data.analysis).toHaveProperty('experience');
    });

    it('should reject upload without file', async () => {
      const response = await request(app)
        .post('/api/cv/upload');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject invalid file types', async () => {
      const response = await request(app)
        .post('/api/cv/upload')
        .attach('cv', 'tests/fixtures/invalid.txt');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/cv/:id', () => {
    it('should get CV analysis by ID', async () => {
      // First upload a CV
      const uploadResponse = await request(app)
        .post('/api/cv/upload')
        .attach('cv', 'tests/fixtures/sample-cv.pdf');

      const cvId = uploadResponse.body.data.cvId;

      // Then retrieve it
      const response = await request(app)
        .get(`/api/cv/${cvId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.cv._id).toBe(cvId);
    });

    it('should not allow accessing other users CVs', async () => {
      // Create another user
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123'
      });

      // This test would require the other user to upload a CV
      // and then the first user trying to access it
      // Implementation depends on your authorization logic
    });
  });
});