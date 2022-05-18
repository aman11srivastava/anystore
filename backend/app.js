const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

if (process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Route imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require('./routes/paymentRoutes');

app.use("/api/", product);
app.use("/api/", user);
app.use("/api/", order);
app.use('/api/', payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
