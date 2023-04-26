const express = require("express");
const UserRouter = express.Router();

const { addMatch, create, findOne, findAll, login, preUpdateUser, updateOne, deleteOne } = require("../controllers/userControllers")

UserRouter
    .route('/')
    .get(findAll)
    .post(create)
    .put(preUpdateUser)

UserRouter
    .route("/addmatch")
    .put(addMatch)
    
UserRouter
    .route('/login')
    .post(login)

UserRouter
    .route("/:id")
    .get(findOne)
    .put(updateOne)
    .delete(deleteOne);


module.exports = UserRouter;