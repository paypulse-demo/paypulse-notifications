// In a real system this would query a database.
// For the demo we use an in-memory store so we don't need to provision a DB.
const SAMPLE_NOTIFICATIONS = {
  'test': {
    id: 'test',
    recipient: 'demo@paypulse.dev',
    amount: 42.50,
    currency: 'EUR',
    status: 'delivered',
    timestamp: '2026-05-12T10:00:00Z',
  },
  'eur-test': {
    id: 'eur-test',
    recipient: 'eur@paypulse.dev',
    amount: 100.00,
    currency: 'EUR',
    status: 'delivered',
    timestamp: '2026-05-12T10:05:00Z',
  },
  'usd-test': {
    id: 'usd-test',
    recipient: 'usd@paypulse.dev',
    amount: 250.00,
    currency: 'USD',
    status: 'delivered',
    timestamp: '2026-05-12T10:10:00Z',
  },
};

function findById(id) {
  return SAMPLE_NOTIFICATIONS[id] || null;
}

function findAll() {
  return Object.values(SAMPLE_NOTIFICATIONS);
}

module.exports = {
  findById,
  findAll,
};