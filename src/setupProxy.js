// const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use((req, res, next) => {
    // Set the required headers for cross-origin isolation
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    // Proceed to the next middleware or route handler
    next();
  });
};
