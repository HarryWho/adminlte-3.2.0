const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  profileId: String,
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic'
  }

})
module.exports = mongoose.model('User', UserSchema)