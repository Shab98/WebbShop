var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Category, required: true }, //Category is required for a product to exist!!! Design decision, can be changed
    reviews: { type: [reviewSchema] }
});

module.exports = mongoose.model('products', productSchema);