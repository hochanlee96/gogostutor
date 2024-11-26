// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use((req, res, next) => {

//     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

//     next();
//   });
// };

// setupProxy.js
module.exports = function (app) {
  app.use((req, res, next) => {
    // List of whitelisted domains where headers should NOT be added
    const whitelist = ["https://res.cloudinary.com"];

    // Check if the request is going to a whitelisted domain
    const requestHost = new URL(req.url, "http://localhost:3000").hostname; // Fallback URL to avoid errors

    if (!whitelist.includes(`https://${requestHost}`)) {
      // Set headers for cross-origin isolation if the request URL is not whitelisted
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
      // res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    }

    // Proceed to the next middleware or route handler
    next();
  });
};
