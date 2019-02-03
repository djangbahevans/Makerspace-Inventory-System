const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const authorize = require('../auth/authorize')
const User = require('../models/User');

// Create new Account
router.post('/register', async (req, res) => {
    const { name, role, username, password } = req.body;
    if (!name || !role || !username || !password) return res.send({ error: 'Incomplete information' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.send({ error: 'Username already exists' })

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

router.post('/login', passport.authenticate('local'), (req, res) => {
    const { name, role, _id } = req.user;
    return res.send({ user: { name, role, _id } });
});

router.post('/logout', (req, res) => {
    req.logout();
    return res.send({ success: true });
});

// Get logged in user details
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const { name, role, _id } = req.user;
        return res.send({ user: { name, role, _id } });
    }
    else return res.send({ error: 'Not logged in' })
})

module.exports = router;
