const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());

// Route imports
const product = require("./routes/productRoutes");

app.use("/api/", product);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
