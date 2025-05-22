const express = require("express");
const cors = require("cors");
const { getSheetData } = require("./sheet");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const data = await getSheetData();
    res.json(data);
  } catch (err) {
    console.error("Error fetching sheet data:", err);
    res.status(500).json({ error: "Failed to fetch sheet data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
