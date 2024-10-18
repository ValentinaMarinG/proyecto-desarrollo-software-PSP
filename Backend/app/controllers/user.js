const bcrypt = require("bcrypt");
const user_model = require("../models/userModel");

const createUser = async (req, res) => {
    const { firstname, lastname, email, phone_number, password } = req.body;
  
    console.log(req.body);
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ msg: "Todos los campos obligatorios deben ser completados" });
    }
  
    const existingUser = await user_model.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).send({ msg: "Ya existe un usuario con ese email" });
    }
  
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
  
    try {
      const result = await user_model.createUser(
        firstname,
        lastname,
        email.toLowerCase(),
        phone_number,
        hashPassword
      );
  
      const newUser = await user_model.getUser(result);
  
      console.log("Nuevo usuario creado: ", newUser);
  
      if (!newUser || !newUser._id) {
        return res.status(400).send({ msg: "Error al obtener el usuario recién creado" });
      }
  
      return res.status(201).send({
        user: newUser
      });
  
    } catch (error) {
      console.error("Error en la creación del usuario:", error);
      res.status(400).send({ msg: "Error al crear el usuario", error: error.message || error });
    }
};
  

const getUser = async (req, res) => {
  const { id } = req.user._id;
  const result = await user_model.getUser(id);
  res.json(result);
};

const getUsers = async (req, res) => {
  const result = await user_model.getUsers();
  res.json(result);
};

module.exports = {
  createUser,
  getUser,
  getUsers
};
