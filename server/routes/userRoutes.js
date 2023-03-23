const express = require("express");
const UserRouter = express.Router();

const { addMatch, create, findOne, findAll, login, updateOne, deleteOne } = require("../controllers/userControllers")

UserRouter
    .route('/')
    .get(findAll)
    .post(create);

UserRouter
    .route('/login')
    .post(login)

UserRouter
    .route("/:id")
    .get(findOne)
    .put(updateOne)
    .delete(deleteOne);

UserRouter
    .route("/addmatch")
    .put(addMatch)

module.exports = UserRouter;