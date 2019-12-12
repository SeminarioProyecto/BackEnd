const express = require("express");
require("./config/db");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

require("dotenv").config({
    path: "variables.env"
});

// crear el servidor de node
const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", routes());

// Escuchar en el puerto 8000
app.listen(process.env.PORT);
