const app = require("./app.js");
const dotenv = require("dotenv");
const connectToCloudDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

// Connection to DB
connectToCloudDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
