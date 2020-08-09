const User = require('../models/User');
const bcrypt = require('bcryptjs')

module.exports = async (data) => {
    let {
        name,
        role,
        username,
        password
    } = data;

    const existingUser = await User.findOne({
        username
    });
    if (existingUser) throw new Error("Username already taken");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        password,
        role,
        username
    });
}