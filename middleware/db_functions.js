const bcrypt = require('bcryptjs');
const User = require('../models/UserModel')
module.exports = {
  SaveUser: function(body) {
    let errors = []
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
          if (err) {
            errors.push({ msg: err })
            reject(errors)
          }
          body.password = hash
          User(body).save((err, user) => {
            if (err) {
              errors.push({ msg: err })
              reject(errors)
            }
            resolve(user)
          })
        });
      });
    })
  }
}