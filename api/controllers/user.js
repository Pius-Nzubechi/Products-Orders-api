const mongoose = require("mongoose");

const User = require("../models/user");

exports.userInfo = (req, res, next) => {
  const id = req.params.userId;
  if (isNaN(req.body.phone) || req.body.phone.length !== 11) {
    return res.status(500).json({
      error: err,
      msg: "invalid phone",
    });
  } else {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      wallet: req.body.wallet,
    });
    user
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "User Information Saved",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: "Unsuccessful",
        });
      });
  }
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        users: docs.map((doc) => {
          return {
            _id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            phone: doc.phone,
            wallet: doc.wallet,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
