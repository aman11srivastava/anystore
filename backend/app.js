const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// Route imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/", product);
app.use("/api/", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
