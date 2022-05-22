// Use CommonJS require below so we can dynamically import during build-time.
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}
