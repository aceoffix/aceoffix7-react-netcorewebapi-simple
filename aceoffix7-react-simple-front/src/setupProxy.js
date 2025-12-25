const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  /**
 *New: acewserver proxy configuration (It is recommended to copy this configuration block and modify the corresponding parts as per the instructions)
 *acewserver service proxy configuration (Key Notes):
 *This rule must be placed BEFORE the existing "/dev-api" rule to ensure priority matching.
 *Compared to the original configuration, only WebSocket support (ws and module.exports) has been added.
 */
  const wsProxyFilter = function (pathname, req) {
    const match = pathname.match("^/dev-api/acewserver");
    if (match) {
      // console.log('Proxy Filter matched:', pathname);
    }
    return match;
  };
  app.use(
    createProxyMiddleware(wsProxyFilter, {
      target: "http://localhost:5097",
      changeOrigin: true,
      pathRewrite: { "^/dev-api": "" },
      ws: true,
    })
  );
  // Original project configuration (remains unchanged)
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