const Product = require("../models/productModel");

//Create Product -  Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    products,
  });
};

// Update product - Admin
exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "No product found",
    });
  }
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    updateProduct,
  });
};

// Delete Product -- Admin
exports.deleteProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "No product found",
    });
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// Get single Product
exports.getProductDetails = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "No product found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};
