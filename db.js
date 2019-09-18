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
    id: { type: String },
    name: { type: String }
});

var userSchema = new Schema({
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
})

var categorySchema = new Schema({
    name: { type : String }
})

var productSchema = new Schema({
    id : { type: String },
    name : { type: String },
    description : { type: String },
    price : { type: Number },
    category : { type : String}
})

var reviewSchema = new Schema({
    text: { type: String },
    rating: { type: Number },
    date: { type: Date }
})

var paymentSchema = new Schema({
    id: { type: String },
    name: { type: String },
    cardNumber: { type: Number },
    ccv: { type: Number },
    month: { type: Number },
    year: { type: Number }
})

var Seller = mongoose.model('sellers', sellerSchema);
var User = mongoose.model('users', userSchema);
var Category = mongoose.model('categories', categorySchema);
var Product = mongoose.model('products', userSchema);
var Review = mongoose.model('reviews', reviewSchema);
var PaymentInfo = mongoose.model('paymentinfos', paymentSchema);

module.exports.Seller = Seller;
module.exports.User = User;
module.exports.Category = Category;
module.exports.Product = Product;
module.exports.Review = Review;
module.exports.Pa = PaymentInfo;