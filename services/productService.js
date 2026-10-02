const db = require("../database/db");

const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

exports.getAllProducts = async () => {
  console.log("[DB] Reading all products from db.json");
  return db.readFileWithDelay();
};

exports.getProductById = async (id) => {
  console.log(`[DB] Reading product ${id} from db.json`);
  const products = await db.readFileWithDelay();
  const product = products.find((item) => item.id === id);
  if (!product) throw httpError(404, "Product not found");
  return product;
};

exports.createProduct = async ({ name, price } = {}) => {
  if (!name || typeof price !== "number") {
    throw httpError(400, "name (string) and price (number) are required");
  }
  const products = await db.readFile();
  const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const product = { id: nextId, name, price };
  products.push(product);
  await db.writeFile(products);
  return product;
};

// PUT: full replacement
exports.replaceProduct = async (id, { name, price } = {}) => {
  if (!name || typeof price !== "number") {
    throw httpError(400, "name (string) and price (number) are required for PUT");
  }
  const products = await db.readFile();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw httpError(404, "Product not found");
  products[index] = { id, name, price };
  await db.writeFile(products);
  return products[index];
};

// PATCH: partial update
exports.updateProduct = async (id, updates = {}) => {
  const products = await db.readFile();
  const product = products.find((p) => p.id === id);
  if (!product) throw httpError(404, "Product not found");
  if (updates.name !== undefined) product.name = updates.name;
  if (updates.price !== undefined) product.price = updates.price;
  await db.writeFile(products);
  return product;
};

exports.deleteProduct = async (id) => {
  const products = await db.readFile();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw httpError(404, "Product not found");
  const [removed] = products.splice(index, 1);
  await db.writeFile(products);
  return removed;
};
