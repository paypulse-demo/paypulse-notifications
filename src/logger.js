const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: 'paypulse-api',
    env: process.env.NODE_ENV || 'production',
    version: process.env.APP_VERSION || '0.1.0',
  },
});

module.exports = logger;