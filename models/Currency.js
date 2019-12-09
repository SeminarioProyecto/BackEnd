const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    nombrePais: {
        type: String,
        trim: true,
        required: true
    },
    nombreMoneda: {
        type: Number,
        trim: true,
        required: true
    },
    codigoMoneda: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Currency", CurrencySchema);