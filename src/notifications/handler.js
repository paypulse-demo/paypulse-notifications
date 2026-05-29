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

  // NOTE: This is the line you'll modify during the live demo.
  // You'll add a new field here.
  return res.status(200).json({
    id: notification.id,
    recipient: notification.recipient,
    amount: notification.amount,
    status: notification.status,
    timestamp: notification.timestamp,
  });
}

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
      timestamp: n.timestamp,
    })),
  });
}

module.exports = {
  getNotification,
  listNotifications,
};