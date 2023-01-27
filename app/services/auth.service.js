const User = require('../models/user.model');
const mongoose = require('mongoose');

exports.getUserByEmail = async(mail) => {
    return await User.findOne({ email: mail });
};

exports.getUserById = async(userId) => {
    return await User.findById(mongoose.Types.ObjectId(userId)).select(
        '-password'
    );
};