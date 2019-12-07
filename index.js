const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// crear el servidor de node
const app = express();

// configuración de la conexion de mongo y mongoose
const mongoUri =
    "mongodb+srv://aguacate:aguacatito@cluster0-wnnfl.mongodb.net/currencyAPI";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("connected", () => {
    console.log("conected to mongo cluster.");
});
mongoose.connection.on("error", err => {
    console.log("Error while connecting to mongo.", err);
});

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", routes());

// Escuchar en el puerto 8000
app.listen(8000, () => {
    console.log("Listening on port 8000");
})
