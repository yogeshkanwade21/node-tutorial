const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
    },
    lastName: {
        type: 'string',
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: 'string',
    },
    jobTitle: {
        type: 'string',
    },
}, {timestamps: true}
);

const User = mongoose.model('users', userSchema);

module.exports = User;