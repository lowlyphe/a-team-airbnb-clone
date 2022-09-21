const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    zipcode: Number,
    city: String,
    streetaddress: String,
    country: String,
    state: String,
    home_type: String,
    prop_type: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model("House", houseSchema)