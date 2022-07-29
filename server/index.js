const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
require('./middleware/db');
const userRoutes = require('./routes/usersroutes.js');
const projectRoutes = require('./routes/projectroutes');

app.use([express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }), cors(), cookieParser(), userRoutes, projectRoutes]);

app.listen(port, () => { console.log(`http://localhost:${port}`) });