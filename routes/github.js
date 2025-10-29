const gitAuth = require('express').Router();
const authController = require('../controllers/oauth.js');


gitAuth.get('/', authController.login); 
gitAuth.get('/auth', authController.authorize);
gitAuth.get('/callback', authController.callback);
gitAuth.get('/logout', authController.logOut);


module.exports = gitAuth;