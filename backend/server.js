const app = require("./app.js");
const dotenv = require("dotenv");
const connectToCloudDatabase = require("./config/database");
const cloudinary = require('cloudinary');

// Handling Uncaught Error
process.on("uncaughtException", (err) => {
  console.log("Error :", err.message);
  console.log("Shutting down server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

// Connection to DB
connectToCloudDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("ERROR: ", err.message);
  console.log("Shutting down server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
