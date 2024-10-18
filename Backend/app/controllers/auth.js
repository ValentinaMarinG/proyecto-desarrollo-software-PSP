const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../utils/jwt");

const config = require("../../config/config");
const pool = config.pool;

const login = async (req, res) => {
    let connection;
    const { email, password } = req.body;

    try {
    if (!email || !password) {
        throw new Error("El email y la contraseña son requeridos");
    }
    connection = await pool.getConnection();

    const emailLowerCase = email.toLowerCase();

    const query = "SELECT * FROM users WHERE email = ?";
    const rows = await connection.query(query, [emailLowerCase]);

    const user = rows[0]
    if (!user) {
        return res.status(401).send({ msg: 'Usuario o contraseña incorrectos' });
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
        return res.status(401).send({ msg: 'Usuario o contraseña incorrectos' });
    }

    res.status (200).send({
        access: jwt.createAccessToken (user),
        refresh: jwt.createRefreshToken (user),
    });
    } catch (error){
        res.status (400).send({ msg: error.message });
    }
}
  
const refreshAccessToken = (req, res) => {
  const { token } = req.body;
  if (!token) res.status(400).send({ msg: "Token requerido" });
  const { _id } = jwt.decoded(token);
  User.findOne({ _id: _id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accesToken: jwt.createAccessToken(userStorage),
      });
    }
  });
};


module.exports = {
  login,
  refreshAccessToken
};
