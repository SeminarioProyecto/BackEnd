const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencyHistorySchema = new Schema({
    currencyOwner: {
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
