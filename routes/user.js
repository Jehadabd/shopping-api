var express = require('express');
var router = express.Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(404).json({ message: err.message })
    } else {
      const user = new User({
        name: req.body.name,
        userName: req.body.userName,
        password: hash,
        email: req.body.email
      });
      user.save().then(resalt => {
        res.status(200).json({ message: `welcome ${req.body.name}` })
      }).catch(err => {
        res.status(404).json({ message: err.message, mesage1: '  the userName or email is useing' })
      });
    };
  });
});
router.get('/login', (req, res) => {
  User.find({ userName: req.body.userName }).then(users => {
    if (users.length >= 1) {
      bcrypt.compare(req.body.password, users[0].password).then(resalt => {
        if (resalt) {
          res.status(200).json({
            message: 'welcome to back'
          });
        } else {
          res.status(404).json({
            message: 'the password is false'
          });
        };
      }).catch(err => {
        res.status(404).json({ message: err.message, mesage1: '  the password is false' })
      });
    } else {
      res.status(404).json({
        message: 'wrong user name'
      });
    };
  }).catch(err => {
    res.status(404).json({
      message: err
    });
  });
});
router.patch('/update/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = {
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
    };
    User.updateOne({ _id: req.params.id }, { $set: user }).then(result => {
      res.status(202).json({
        message: "User updated successfully"
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});
router.delete('/delete/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = {
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
      email:req.body.email
    };
    User.findOneAndDelete({ _id: req.params.id }, { $set: user }).then(result => {
      res.status(202).json({
        message: "User delete successfully"
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});
module.exports = router;
