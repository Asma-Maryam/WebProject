const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name can\'t be empty'
    },
    category: {
        type: String,
        required: 'category can\'t be empty',
    },
    description: {
        type: String,
        required: 'description can\'t be empty',
        minlength : [20,'description must be atleast 20 character long']
    },
    
    price: {
        type: String,
        required: 'price can\'t be empty',
        default:0.0
    },
    picture: {
        type: String,
        default:'null'
    },
    saltSecret: String
});

mongoose.model('Product', productSchema);