const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>Express Frontend</title></head>
<body style="font-family:sans-serif;text-align:center;margin-top:60px">
  <h1>Express Frontend v2</h1>
  <p>Message from Flask backend:</p>
  <h2 id="msg">Loading...</h2>
  <script>
    fetch('/api/backend').then(r => r.json())
      .then(d => document.getElementById('msg').innerText = d.message)
      .catch(() => document.getElementById('msg').innerText = 'Backend not reachable');
  </script>
</body></html>`);
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Frontend -> Flask backend proxy
app.get("/api/backend", async (req, res) => {
  try {
    const r = await fetch(`${BACKEND_URL}/api/message`);
    res.json(await r.json());
  } catch (e) {
    res.status(502).json({ message: "Backend not reachable" });
  }
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => console.log(`Express running on ${PORT}`));
}

module.exports = app;
