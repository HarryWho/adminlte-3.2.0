module.exports = {
  Validate: function(body) {
    return new Promise((resolve, reject) => {
      let errors = []
      if (!body.displayName || !body.email || !body.password || !body.password2) {
        errors.push({ msg: 'All fields are required' })
      }
      if (body.password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
      }
      if (body.password !== body.password2) {
        errors.push({ msg: 'Passwords do not match' })
      }
      if (!body.terms) {
        errors.push({ msg: 'You must agree to the Terms of Service' })
      }
      if (errors.length === 0)
        resolve(true)
      else
        reject(errors)
    })
  }
}