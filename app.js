const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

// Central error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
