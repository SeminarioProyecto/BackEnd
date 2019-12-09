const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencyHistorySchema = new Schema({
    currencyCode: {
        type: String,
        trim: true,
    },
    rate: {
        type: Number
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model("CurrencyHistory", CurrencyHistorySchema);