const fs = require("fs/promises");
const path = require("path");

// db.json lives in the project root
const pathToFile = path.join(__dirname, "..", "db.json");

async function readFile() {
  const data = await fs.readFile(pathToFile, "utf-8");
  return JSON.parse(data);
}

async function writeFile(products) {
  await fs.writeFile(pathToFile, JSON.stringify(products, null, 2), "utf-8");
}

// Simulates a slow database (1.5s) so cache HIT vs MISS is easy to see
async function readFileWithDelay() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return readFile();
}

module.exports = { readFile, writeFile, readFileWithDelay };
