const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 8000;

dotenv.config();

const app = express();

app.use(cors());

//
app.use("/api", apiRoutes);

// Create a simple "Hello" API endpoint
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
