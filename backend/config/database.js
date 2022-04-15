const mongoose = require("mongoose");

const connectToCloudDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then(() => {
      console.log("Conneciton to cloud database successful");
    })
    .catch((error) => {
      console.log("Failed to connect with cloud service", error);
    });
};

module.exports = connectToCloudDatabase;
