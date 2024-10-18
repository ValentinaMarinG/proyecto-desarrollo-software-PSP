const express = require("express");
const UserController = require("../controllers/user");
const { asureAuth } = require("../middleware/authenticated");

const api= express.Router()

api.post("/createuser", UserController.createUser);
api.get("/me",  asureAuth, UserController.getUser);
api.get("/", UserController.getUsers);

module.exports = api;