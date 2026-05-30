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

  // BUG: This code accidentally calls .toUpperCase() on amount instead of currency.
  // Amount is a number, so this throws TypeError at runtime.
  // The tests don't catch this because they only verify the response shape,
  // not the order of operations inside the handler.
  const formattedCurrency = notification.amount.toUpperCase();

  return res.status(200).json({
    id: notification.id,
    recipient: notification.recipient,
    amount: notification.amount,
    currency: formattedCurrency,
    status: notification.status,
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