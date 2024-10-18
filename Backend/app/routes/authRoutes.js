const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/login", AuthController.login);
api.post("/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;
