const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: { type: Buffer, contentType: String },

    fromdate: { type: Date},
    todate: { type: Date,}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', schema);