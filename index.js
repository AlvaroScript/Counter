const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
const COUNT_FILE = "count.txt";
let count = 0;

if (!fs.existsSync(COUNT_FILE)) {
  fs.writeFileSync(COUNT_FILE, "0", "utf8");
}
count = parseInt(fs.readFileSync(COUNT_FILE, "utf8")) || 0;

app.get("/track", (_, res) => {
  count++;
  fs.writeFileSync(COUNT_FILE, count.toString(), "utf8");
  res.json({ executed: count });
});

app.get("/count", (_, res) => {
  res.json({ executed: count });
});

app.listen(port, () => console.log(`Server on port ${port}`));
