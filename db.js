const mongoose = require('mongoose');

const dbAddress = "localhost";
const dbPort = "27017";
const dbName = "webshop";
var db = mongoose.connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

//DB STRUCTURE:
/*
    seller{}
    user{
        paymentinfo{}
    }
    product{
        reference to category
        reviews{}
    }
    category{}

    Seller is standalone,
    user has inside its JSON paymentinfo,
    product has inside its JSON the reference to find the category and the reviews,
    category is standalone 
*/

var sellerSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

var userSchema = new Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    paymentDatas: { type: [paymentDataSchema] }
})

var categorySchema = new Schema({
    name: { type: String, required: true }
})

var productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Category, required: true }, //Category is required for a product to exist!!! Design decision, can be changed
    reviews: { type: [reviewSchema] }
})

var reviewSchema = new Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date }
})

var paymentDataSchema = new Schema({
    nameOnCard: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cvv: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true }
})

var Seller = mongoose.model('sellers', sellerSchema);
var User = mongoose.model('users', userSchema);
var Category = mongoose.model('categories', categorySchema);
var Product = mongoose.model('products', productSchema);
var Review = mongoose.model('reviews', reviewSchema);
var PaymentData = mongoose.model('paymentdatas', paymentDataSchema);

module.exports.Seller = Seller;
module.exports.User = User;
module.exports.Category = Category;
module.exports.Product = Product;
module.exports.Review = Review;
module.exports.PaymentData = PaymentData;