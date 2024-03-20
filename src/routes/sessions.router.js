const { Router } = require('express');
const passport = require('passport');
const userModel = require('../models/user');
const GitHubStrategy = require('passport-github').Strategy;

const sessionsRouter = Router();

sessionsRouter.post('/register', async (req, res) => {
});

sessionsRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
   return done(null, profile);
}
));

sessionsRouter.get('/auth/github',
  passport.authenticate('github'));

sessionsRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = sessionsRouter;
