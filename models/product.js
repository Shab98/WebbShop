var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Needed modules
var Category = require('./category');
var Review = require('./review');

var productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Category.schema, required: true }, //Category is required for a product to exist!!! Design decision, can be changed
    reviews: { type: [Review.schema] }
});

module.exports = mongoose.model('products', productSchema);