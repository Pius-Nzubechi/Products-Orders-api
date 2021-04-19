const mongoose = require("mongoose");

const Link = require("../models/link");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.linkNin = (req, res, next) => {
  User.findById(req.body.userId).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }
    if (isNaN(req.body.NIN) || req.body.NIN.length !== 11) {
      res.status(404).json({
        msg: "invalid NIN",
      });
    }
    bcrypt.hash(req.body.NIN, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const link = new Link({
          _id: mongoose.Types.ObjectId(),
          NIN: hash,
          user: req.body.userId,
        });
        link
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              linkedUser: {
                _id: result._id,
                NIN: result.NIN,
                user: result.user,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
  });
};

exports.allLinkedNin = (req, res, next) => {
  Link.find()
    .populate("user")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        LinkedNin: docs.map((doc) => {
          return {
            _id: doc._id,
            user: doc.user,
            phone: doc.phone,
            NIN: doc.NIN,
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
