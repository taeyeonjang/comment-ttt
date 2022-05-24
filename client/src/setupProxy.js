const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/comment',
    createProxyMiddleware({
      target: 'http://localhost:5100',
      changeOrigin: true,
    })
  );
};