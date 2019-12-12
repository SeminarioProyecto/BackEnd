const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" })

// configuración de la conexion de mongo y mongoose
const mongoUri = "mongodb+srv://aguacate:aguacatito@cluster0-wnnfl.mongodb.net/currencyAPI";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB.");
});
mongoose.connection.on("error", err => {
    console.log("Error while connecting to mongo.", err);
});