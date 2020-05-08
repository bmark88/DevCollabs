require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');
app.use(bodyParser.json())
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);

const { Pool } = require('pg')
const dbParams = {
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
 }
const db = new Pool(dbParams);

const indexRoutes = require('./routes/index.ts')
const groupRoutes = require('./routes/group.ts')

app.use("/", indexRoutes(db));
app.use("/group", groupRoutes(db))



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
