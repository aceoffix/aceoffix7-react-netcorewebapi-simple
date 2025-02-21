const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/dev-api',
    createProxyMiddleware({
      target: 'http://localhost:5097',
      changeOrigin: true,
      pathRewrite: {
        '^/dev-api': '',
      },
    })
  );
};