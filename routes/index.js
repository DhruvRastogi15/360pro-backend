var express = require('express');
var router = express.Router();

var autoCreateDBS = require("../config/autoCreateDBS");
var Admin = require("../models/Admin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ status: "ok", msg: "Working.." });
});

router.post("/adminLogin", function (req, res) {

  req.body = JSON.parse(Base64.decode(JSON.stringify(req.body)));

  if (req.body.email && req.body.password) {

      var email = req.body.email;
      var decodedEmail = Base64.decode(email);
      email = decodedEmail.toLowerCase();

      let Npassword = req.body.password;
      Npassword = Base64.decode(Npassword);

      Admin.findOne({ email: email }, function (err, Data) {
          if (err || !Data) {
              res.json({ status: "ERROR", msg: "Email not found" });
          } else {
              if (Data.password) {
                  var userPasswd = Data.password;
                  var passwd = Npassword;
                  bcrypt.compare(passwd, userPasswd).then(function (bcryptData) {
                      // data == true
                      if (bcryptData == true) {
                          res.json({
                              status: "OK",
                              msg: "You are successfully logged in.",
                              data: Data
                          });
                      } else {
                          res.json({ status: "ERROR", msg: "Wrong Password." });
                      }
                  });
              } else {
                  res.json({ status: "ERROR", msg: "Please verify your mail" });
              }
          }
      });
  } else {
      res.json({ status: "ERROR", msg: "Pelase enter all valid details." });
  }
});


module.exports = router;
