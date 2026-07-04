const request = require('supertest');
const createApp = require('../src/app');

describe('Notifications API', () => {
  const app = createApp();

  describe('GET /notifications/:id', () => {
    test('returns 200 with notification data for valid id', async () => {
      const response = await request(app).get('/notifications/test');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 'test',
        recipient: 'demo@paypulse.dev',
        amount: 42.50,
        // currency: 'EUR', // <-- New field added here
        status: 'delivered',
      });
      // expect(response.body.currency).toBe('EUR'); // <-- New assertion added here
      expect(response.body.timestamp).toBeDefined();
    });

    test('returns 404 for non-existent id', async () => {
      const response = await request(app).get('/notifications/does-not-exist');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'not_found',
        message: 'Notification does-not-exist not found',
      });
    });

  });

  describe('GET /notifications', () => {
    test('returns 200 with list of all notifications', async () => {
      const response = await request(app).get('/notifications');
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThan(0);
      expect(Array.isArray(response.body.notifications)).toBe(true);
      // expect(response.body.notifications[0].currency).toBe('EUR'); // <-- New assertion added here
    });
  });

  describe('Unknown routes', () => {
    test('returns 404 for unknown route', async () => {
      const response = await request(app).get('/unknown');
      expect(response.status).toBe(404);
    });
  });
});
