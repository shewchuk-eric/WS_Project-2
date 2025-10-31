/*require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('In serializeUser');
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


//const app = (require('../index.js'));
//const passport = (require('../index.js'));
*/


const login = async (req, res, next) => {
    res.send('<a href="/github/auth">Login With Your GitHub Account<a>');
  };

const authorize = async (req, res, next) => {
  console.log('In authorize');
    passport.authenticate('github', { scope: [ 'user:email' ] })
};

const callback = async (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/profile');
    }
};  

const logOut = async (req, res, next) => {
    req.logout(() => {
      res.redirect('/');
    })
};

  module.exports = { login, authorize, callback, logOut };