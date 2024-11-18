const mongoose =require('mongoose')

const candleSchema = new mongoose.Schema({
    name: String,
    hasPrize: Boolean,
})

const Candle = mongoose.model('Candle', candleSchema)

module.exports= Candle