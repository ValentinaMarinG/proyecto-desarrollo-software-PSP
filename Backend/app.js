const express = require("express");
const cors = require('cors');
const config = require("./config/config");

const app = express();
const routes_system = require("./app/routes");
require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.listen(process.env.PORT_PC, () => {
  console.log(`Connect in the port PC ${process.env.PORT_PC}`);
  console.log(`http://localhost:${process.env.PORT_PC}`);
});

/* config.pool
  .getConnection()
  .then(() => console.log("Success connection"))
  .catch((err) => console.error(err)); 
*/

app.use(express.json());
routes_system(app);