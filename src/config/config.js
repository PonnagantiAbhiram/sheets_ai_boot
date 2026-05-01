/**
 * config.js
 * Front-end configuration — reads env vars injected by Vite.
 * Variables must be prefixed with VITE_ to be exposed to the browser.
 */

const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  APP_NAME: 'Task Automation System',
  VERSION: '1.0.0',
};

export default config;
