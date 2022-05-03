const router = require('express').Router();
const { Validate } = require('../middleware/register_validation');
const { SaveUser } = require('../middleware/db_functions')
router.get('/', (req, res) => {
  if (res.isAuthenticated)
    res.render('pages/home')
  else
    res.redirect('/login')
})

router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/register', (req, res) => {
  res.render('pages/register')
})

router.post('/register', (req, res) => {
  Validate(req.body).then((pass) => {
    SaveUser(req.body).then((user) => {
      res.redirect('/login')
    }).catch((errors) => {
      res.render('pages/register', { errors })
    })
  }).catch((errors) => {
    res.render('pages/register', { errors })
  })
})

module.exports = router