const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    age: {
        type: Number,
        require: [true, "Age is required"]
    },
    gender: {
        type: String,
        required: [true, "Please enter your gender"]
    },
    genderPreference: {
        type: String,
        required: [true, "Please enter your gender preference"]
    },
    url: {
        type: String,
        required: [true, "Please submit a picture"]
    },
    matches: {
        type: Array
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

// UserSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY,{expiresIn: "7d"})
//     return token
// }

// UserSchema.virtual('confirmPassword')
//     .get(() => this._confirmPassword)
//     .set(value => this._confirmPassword = value);

const User = mongoose.model('Users', UserSchema)
module.exports = User