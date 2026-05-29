const express = require('express');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const notificationsHandler = require('./notifications/handler');

function createApp() {
  const app = express();

  // Request logging middleware
  app.use(pinoHttp({ logger }));

  // JSON parsing
  app.use(express.json());

  // Health checks (separate from main API)
  app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get('/health/ready', (req, res) => {
    res.status(200).json({ status: 'ready' });
  });

  // Notifications API
  app.get('/notifications', notificationsHandler.listNotifications);
  app.get('/notifications/:id', notificationsHandler.getNotification);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: 'not_found',
      message: `Route ${req.method} ${req.path} not found`,
    });
  });

  // Error handler (must have 4 args for Express to recognise it)
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({
      error: 'internal_error',
      message: 'Something went wrong',
    });
  });

  return app;
}

module.exports = createApp;