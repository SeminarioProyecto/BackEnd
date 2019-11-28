const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// Crear servidor
const app = express();

// Habilitar body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(8000, () => {
    console.log("Listening on PORT 8000");
});