const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Crear servidor
const app = express();

// Habilitar body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
    console.log("Listening on PORT 4000");
});