const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Support session usage
module.exports = app => {

    app.use(passport.initialize());
    app.use(passport.session());

    // passport config
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false);
                if (!user.verifyPassword(password)) return done(null, false, { msg: 'Invalid email or password.' });
                return done(null, user);
            });
        }

    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};