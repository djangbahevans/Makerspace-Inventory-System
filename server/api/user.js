const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const authorize = require('../auth/authorize')
const User = require('../models/User');

// Create new Account
// User has name, role, username, hash in schema
router.post('/register', async (req, res) => {
    const { name, role, username, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, hash, role, username
    });

    if (user) {
        return req.login(user, (err) => {
            if (err) return res.send({ error: 'Error logging in' })
            else return res.send(user);
        });
    }
    else return res.send({ err: 'Error creating new account' })
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return req.login(user, (err) => {
            if (err) return res.send({ error: 'Error logging in' })
            else return res.send(user);
        });
    }
    else return res.send({error: 'Could not log in'});
});

router.get('/logout', authorize, function (req, res) {
    req.logout();
    return res.redirect('/')
});

module.exports = router;