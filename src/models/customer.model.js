const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    customername: {type: String, required: true, max: 100},
    phonenumber: {type: Number, required: true},
    date: {type: Date, required:true},
    location: {type: String, required: false},
    vehicles: {type: Array, required: false},
    user: {type: String, required: true},
    customertype: {type: String, required: true},
});

CustomerSchema.set('toJSON', { virtuals: true });

// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);