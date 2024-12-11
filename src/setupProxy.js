// module.exports = function (app) {
//   app.use((req, res, next) => {
//     // List of whitelisted domains where headers should NOT be added
//     const whitelist = ["https://res.cloudinary.com", "https://js.stripe.com"];

//     // Check if the request is going to a whitelisted domain
//     const requestHost = new URL(req.url, "http://localhost:3001").hostname; // Fallback URL to avoid errors

//     if (!whitelist.includes(`https://${requestHost}`)) {
//       // Set headers for cross-origin isolation if the request URL is not whitelisted
//       res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//       res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//       // res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//     }

//     next();
//   });
// };
module.exports = function (app) {
  // app.use((req, res, next) => {
  //   // List of whitelisted domains where COEP headers should NOT be added
  //   const whitelist = ["res.cloudinary.com"];

  //   // Extract hostname from the requested URL
  //   const requestHost = new URL(req.url, "http://localhost:3001").hostname;

  //   // Add headers only for non-whitelisted domains
  //   if (!whitelist.some((domain) => requestHost.endsWith(domain))) {
  //     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  //     res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  //   }

  //   next();
  // });
  app.use((req, res, next) => {
    // Extract hostname from the request
    let requestHost;
    try {
      requestHost = new URL(req.url, `http://${req.headers.host}`).hostname;
    } catch (error) {
      // If URL parsing fails, fall back
      requestHost = null;
    }

    // Check if the request is going to js.stripe.com
    if (requestHost === "js.stripe.com") {
      // Remove COEP and COOP headers for Stripe
      res.removeHeader("Cross-Origin-Embedder-Policy");
      res.removeHeader("Cross-Origin-Opener-Policy");
    }
    // else {
    //   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    //   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    // }

    // Continue to the next middleware or route
    next();
  });
};
