const express = require("express");
const UserRouter = express.Router();

const { addMatch,create, findOne, findAll, updateOne, deleteOne } = require("../controllers/userControllers")

UserRouter
    .route('/')
    .get(findAll)
    .post(create);

UserRouter
    .route("/:id")
    .get(findOne)
    .put(updateOne)
    .delete(deleteOne);

UserRouter
    .route("/addmatch")
    .put(addMatch)

module.exports = UserRouter;