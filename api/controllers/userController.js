const bycrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bycrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.json({ error: err });
    }
    let user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.json({
          msg: "user created successfully",
          result
        });
      })
      .catch(error => console.log(error));
  });
};

const login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (user) {
        bycrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ err });
          }
          if (result) {
            let token = jwt.sign(
              { email: user.email, _id: user._id },
              "SECRET",
              { expiresIn: "2h" }
            );

            res.json({
              msg: "login successfull",
              token
            });
          } else {
            res.json({
              msg: "password doesn't match"
            });
          }
        });
      } else {
        res.json({
          msg: "user not found"
        });
      }
    })
    .catch(err => console.log(err));
};

const getAllUser = (req, res, next) => {
  User.find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => console.log(err));
};

module.exports = {
  register,
  login,
  getAllUser
};
