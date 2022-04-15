const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product -  Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const RESULT_PER_PAGE = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(RESULT_PER_PAGE);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Update product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
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
});

// Delete Product -- Admin
exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
