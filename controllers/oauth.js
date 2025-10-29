//const passport = require('passport');
//const session = require('express-session');
//const GitHubStrategy = require('passport-github2').Strategy;
//require('dotenv').config(); 

/*passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/github/callback" 
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));
.use(session({
    secret: "secret",
    resave: false, 
    saveUninitialized: true
  }))
  //.use(passport.initialize())
  //.use(passport.session())
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
}); */



const login = async (req, res, next) => {
    res.send('<a href="/github/auth">Login With GitHub<a>');
  };

const authorize = async (req, res, next) => {
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