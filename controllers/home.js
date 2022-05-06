const router = require('express').Router();
const passport = require('passport')
const { Validate } = require('../middleware/register_validation');
const { SaveUser } = require('../middleware/db_functions')
require('../config/LocalStrategy')
router.get('/', (req, res) => {
  if (req.isAuthenticated())
    res.render('pages/home', { user: req.user })
  else
    res.redirect('/login')
})

router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('pages/register')
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

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