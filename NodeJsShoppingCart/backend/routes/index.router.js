const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/users.controller');
const ctrlProduct = require('../controllers/products.controller');

router.post('/register', ctrlUser.register);
router.post('/signin', ctrlUser.signin);
router.post('/product', ctrlProduct.product);
router.get('/products', ctrlProduct.products);

module.exports = router;