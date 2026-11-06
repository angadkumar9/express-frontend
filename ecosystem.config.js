module.exports = {
  apps: [{
    name: "express-frontend",
    script: "server.js",
    cwd: __dirname,
    env: { PORT: 3000, BACKEND_URL: "http://localhost:5000" }
  }]
};
