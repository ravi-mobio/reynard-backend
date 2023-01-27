/* models */
const User = require('../models/user.model');

/* create user */
exports.createUser = async (user) => {
    return await User.create(user);
};

/* get by email */
exports.getByEmail = async (email) => {
    return await User.findOne({
        email: email,
        isDeleted: false
    });
};