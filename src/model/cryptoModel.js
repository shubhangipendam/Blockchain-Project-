const mongoose = require('mongoose')


let cryptoSchema = new mongoose.Schema(

    {
        symbol: { type: String},// String and Unique
        name: { type: String },// String and Unique
        marketCapUsd: { type: String },// String  ( not Number)
        priceUsd: { type: String} //String
    },
    { timestamp: true },
)

module.exports = mongoose.model("crypto", cryptoSchema )