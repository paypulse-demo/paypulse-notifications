const repository = require('./repository');
const logger = require('../logger');

function getNotification(req, res) {
  const { id } = req.params;
  logger.info({ notificationId: id }, 'Fetching notification');

  const notification = repository.findById(id);

  if (!notification) {
    logger.warn({ notificationId: id }, 'Notification not found');
    return res.status(404).json({
      error: 'not_found',
      message: `Notification ${id} not found`,
    });
  }

  // Add the `currency` field to the response:
  return res.status(200).json({
    id: notification.id,
    recipient: notification.recipient,
    amount: notification.amount,
    status: notification.status,
    currency: notification.currency, // <-- New field added here
    timestamp: notification.timestamp,
  });
}
// Add: currency field to the listNotifications response as well:
function listNotifications(req, res) {
  logger.info('Listing all notifications');
  const notifications = repository.findAll();
  return res.status(200).json({
    count: notifications.length,
    notifications: notifications.map((n) => ({
      id: n.id,
      recipient: n.recipient,
      amount: n.amount,
      status: n.status,
      currency: n.currency, // <-- New field added here
      timestamp: n.timestamp,
    })),
  });
}

module.exports = {
  getNotification,
  listNotifications,
};

// Adding this comment for test purposes. Please ignore this comment.