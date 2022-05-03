const mongoose = require('mongoose');
module.exports = {
  ConnectMongoDB: function() {
    mongoose.connect(process.env.MONGO_URI).then((db) => {
      console.log("Mongo Connected...")
    }).catch((err) => {
      console.log("Error connecting to Mongo: ", err)
    });
  }
}