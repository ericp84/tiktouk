var express = require('express');
//securité//
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
//import model//
const userModel = require('../models/users');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//signup////////////////////////////////////////////////////////////////////////
router.post('/signup', async function(req, res, next) {
  let result = false;
  let error = [];
  let newUser = null;
  let hash = bcrypt.hashSync(req.body.password, 10);

  const userData = await userModel.findOne ({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
  })
  if(userData != null) {
    error.push("UTILISATEUR DEJA PRESENT")
  }
  if(req.body.email === ""||req.body.firstname === ""||req.body.lastname === ""||req.body.username === "") {
    error.push("VEUILLEZ VERIFIER LES INFORMATIONS SAISIES")
  }
  if(error.length === 0) {
    let userSignup = new userModel({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hash,
      token: uid2(32)
    })
    newUser = await userSignup.save();
    if(newUser) {
      result = true
    }
  }
  res.json({newUser, result, error})
})
//login///////////////////////////////////////////////////////////////////////////
router.post('/login', async function(req, res, next) {
  let result = false;
  let error = [];
  let userin = null;

  if(req.body.username === "" || req.body.password === "") {
    error.push("VERIFIER LES INFORMATIONS SAISIES")
  }
  if(error.length === 0) {
    userin = await userModel.findOne({
      username: req.body.username
    })
    if(bcrypt.compareSync(req.body.password, userin.password)) {
      result = true;
      token = userin.token;
    }  else {
      error.push("VERIFIER LES IDENTIFIANTS")
    }
  }
  console.log(userin)
  res.json({userin, result, error})
})
module.exports = router;
