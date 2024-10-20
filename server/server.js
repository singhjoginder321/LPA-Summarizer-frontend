const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Create a simple "Hello" API endpoint
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
