const express = require('express')
const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
const multer = require('multer');
const app = express()
const port = 3000 || process.env.port;

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const register = require('./Routes/register.js');

app.use('/register', register);

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} at ${new Date()}`))