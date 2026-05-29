const request = require('supertest');
const createApp = require('../src/app');

describe('Health endpoints', () => {
  const app = createApp();

  test('GET /health/live returns 200', async () => {
    const response = await request(app).get('/health/live');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET /health/ready returns 200', async () => {
    const response = await request(app).get('/health/ready');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ready' });
  });
});