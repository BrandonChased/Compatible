const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => {
                // Basic email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    age: {
        type: Number,
        required: false,
        min: 18,
        max: 120,
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female'],
    },
    genderPreferences: {
        type: [String],
        required: false,
        enum: ['male', 'female'],
    },
    images: {
        type: [String],
        required: false,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const User = mongoose.model('Users', UserSchema)
module.exports = User