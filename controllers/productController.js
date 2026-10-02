const productService = require("../services/productService");

exports.getAll = async (req, res, next) => {
  try {
    res.json(await productService.getAllProducts());
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    res.json(await productService.getProductById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await productService.createProduct(req.body));
  } catch (err) {
    next(err);
  }
};

exports.replace = async (req, res, next) => {
  try {
    res.json(await productService.replaceProduct(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    res.json(await productService.updateProduct(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    res.json(await productService.deleteProduct(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
};
