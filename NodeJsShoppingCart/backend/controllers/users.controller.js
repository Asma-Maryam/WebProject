const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY='secret';
module.exports.register = (req, res, next) => {
    
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    
    user.save((err, doc) => {
        if (!err)
        return res.status(200).send({ message: doc});
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
module.exports.signin = (req, res, next) => {

  try
  {
        User.find({
          'email': req.body.email,
      }).then(user => {

        const result = bcrypt.compareSync(req.body.password, user[0].password);
          if (result)
          {
            const payload = 
            {
              id : user[0]._id,
              role : user[0].role,
              name : user[0].name,
              email : user[0].email
            }
            let token = jwt.sign(payload , process.env.SECRET_KEY , {
              expiresIn:1440
            })
            return res.status(200).send({ message: user,token:token});
          } else 
          {
            return res.status(400).send({ message: "Password or email not correct"});
          }
        });
    
  }
  catch (e)
  {
    return res.status(400).send({ message: "Password or email not correct"});
  }


  
}

