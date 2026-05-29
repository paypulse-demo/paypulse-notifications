// This must be required BEFORE any other module that needs to be traced.
// See src/server.js for the load order.
const tracer = require('dd-trace').init({
  service: 'paypulse-api',
  env: process.env.NODE_ENV || 'production',
  version: process.env.APP_VERSION || '0.1.0',
  logInjection: true,
  runtimeMetrics: true,
});

module.exports = tracer;