var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date }
});

module.exports = mongoose.model('reviews', reviewSchema);