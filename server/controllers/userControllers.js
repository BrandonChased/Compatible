const User = require("../models/UserModel");
const bcrypt = require("bcryptjs")

const create = async (req, res) => {
    const { name, email, password, age, gender, genderPreference, url } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    try {
      const oldUser = await User.findOne({ email: req.body.email });
  
      if (oldUser) {
        return res.status(409).json({ error: "User already exists. Please log in." });
      }
  
      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
        age,
        gender,
        genderPreference,
        url,
      });
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not create user" });
    }
  };

const addMatch = async (req, res) => {
    const { userId, matchedUserId } = req.body

    try {
        const query = { users_id: userId }
        const updatdDocument = {
            $push: { matches: { users_id: matchedUserId } }
        }
        const user = await User.updateOne(query, updatdDocument)
        res.send(user)
    }
    catch {
        res.send({ status: "error" })
    }
}

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

module.exports = {addMatch, create, findOne, findAll, updateOne, deleteOne };
