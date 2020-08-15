const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = mongoose.model('Product');


module.exports.product = (req, res, next) => {
    
    var product = new Product();
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    product.picture = req.body.picture;
    
    product.save((err, doc) => {
        if (!err)
        return res.status(200).send({ message: "product uploaded successfully"});
        else {
            if (err.code == 11000)
                res.status(422).send(['product not uploaded successfully.']);
            else
                return next(err);
        }

    });
}

module.exports.products = (req, res, next) => {
    
    try
    {
        Product.find({
          
      }).then(products => {
        return res.status(200).send({ products: products});         
        });
    
  }
  catch (e)
  {
    return res.status(400).send({ message: "no data"});
  }

   
}