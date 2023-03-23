const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    const { email, password } =
        req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res
                .status(409)
                .json({ error: "User already exists. Please log in." });
        }
        const safeEmail = email.toLowerCase()

        const user = await User.create({
            email: safeEmail,
            password: encryptedPassword,
        });


        const token = jwt.sign({ email: user.email, userId: user._id }, "mySecretKey", {
            expiresIn: 60 * 24
        });

        res.status(200).json({ token, userId: user._id, email: safeEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create user" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ email: user.email, userId: user._id }, "mySecretKey", {
            expiresIn: 60 * 24
        });

        // Return JWT to client
        res.status(200).json({ token, userId: user._id, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const addMatch = async (req, res) => {
    const { userId, matchedUserId } = req.body;

    try {
        const query = { users_id: userId };
        const updatdDocument = {
            $push: { matches: { users_id: matchedUserId } },
        };
        const user = await User.updateOne(query, updatdDocument);
        res.send(user);
    } catch {
        res.send({ status: "error" });
    }
};

const findOne = (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

const findAll = (req, res) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

const updateOne = (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

const deleteOne = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

module.exports = { addMatch, create, findOne, findAll, login, updateOne, deleteOne };
