const config = require("../../config/config");
const pool = config.pool;

async function createUser(firstname, lastname, email, phone_number, password) {
    try {
      let connection = await pool.getConnection();
      const query = "INSERT INTO users (firstname, lastname, email, phone_number, `password`) VALUES (?, ?, ?, ?, ?)";
      const result = await connection.query(query, [firstname, lastname, email, phone_number, password]);
      const newUserId = result.insertId;
      return newUserId;
    } catch (err) {
      throw err;
    }
  }

async function getUser(userId) {
  try {
    let connection = await pool.getConnection();
    const query = "SELECT * FROM users WHERE _id = ?";
    const rows = await connection.query(query, [userId]);
    return rows[0];
  } catch (err) {
    throw err;
  }
}

async function getUsers() {
  try {
    let connection = await pool.getConnection();
    const query = "SELECT * FROM users";
    const rows = await connection.query(query);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  let connection;
  try {
    connection = await pool.getConnection();

    const emailLowerCase = email.toLowerCase();

    const query = "SELECT * FROM users WHERE email = ?";
    const rows = await connection.query(query, [emailLowerCase]);
    return rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  getUserByEmail
};
