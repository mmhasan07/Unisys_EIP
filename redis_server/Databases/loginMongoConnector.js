const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const connectToMongoLogin = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDBLogin"))
  .catch((err) => console.log(err.message))
};

module.exports = connectToMongoLogin;