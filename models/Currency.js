const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    nombrePais: {
        type: String,
        trim: true
    },
    nombreMoneda: {
        type: String,
        trim: true
    },
    codigoMoneda: {
        type: String,
        unique: true,
        uppercase: true,
        trim: true
    },
    valorActual: {
        type: Number
    },
    date: {
        type: Date
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Currency", currencySchema);
