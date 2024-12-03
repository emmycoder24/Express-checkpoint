const express = require("express");
const path = require("path");

const app = express();

// Middleware to verify time
const timeMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, ..., 6 = Saturday
  const hour = now.getHours(); // 0-23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send(`
      <h1>Access Restricted</h1>
      <p>The website is only accessible Monday to Friday, 9 AM to 5 PM.</p>
    `);
  }
};

// Apply middleware globally
app.use(timeMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
