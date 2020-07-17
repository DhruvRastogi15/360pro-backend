var express = require("express");
var router = express.Router();
var Base64 = require('js-base64').Base64;


var Test = require("../models/Test");
// var User = require("../models/User");
// var sendEmail = require("../config/sendEmail");

router.get("/test", function (req, res, next) {
    res.json({ status: "ok", msg: "Working.." });
});

router.post("/addTest", function (req, res) {

    req.body = JSON.parse(Base64.decode(JSON.stringify(req.body)));
    
    console.log("body = ");
    console.log(req.body);
    if (
        req.body.email &&
        req.body.password
    ) {
        // var email = req.body.email.toLowerCase();
        // email = validator.isEmail(req.body.email);
        // if (email == true) {
            // Test.findOne({ email: req.body.email }, function (err, Data) {
                // if (err) {
                //     res.json({ status: "ERROR", msg: "Getting issue." });
                // } else {
                    // if (Data) {
                    //     res.json({ status: "ERROR", msg: "Manager already exists." });
                    // } else {
                        var head_details = new Test({
                            email: req.body.email,
                            password: req.body.password
                        });
                        head_details.save(function (err, result) {
                            if (err || !result) {
                                res.json({ status: "ERROR", msg: "Getting issue." });
                            } else {
                                var userDetails = new Test({
                                    email: req.body.email,
                                    password: req.body.password,
                                });
                                userDetails.save(function (userErr, userResult) {
                                    if (userErr || !userResult) {
                                        res.json({ status: "ERROR", msg: "Getting issue." });
                                    } else {
                                        // var _id = userResult._id;
                                        // var from = '"Essays with Edukemy" <essays@edukemy.com>';
                                        // var to = req.body.email;
                                        // var sub = "Reset Password for EduKemy";
                                        // var userName = req.body.managerName;
                                        // sendEmail(to, from, _id, sub, userName);
                                        res.json({
                                            status: "OK",
                                            message: "Add test successful"
                                        });
                                        console.log("Add test successful")
                                    }
                                });
                            }
                        });
                    // }
                // }
            // });
        // } else {
        //     res.json({ status: "ERROR", msg: "Please enter valid mail id." });
        // }
    } else {
        res.json({ status: "ERROR", msg: "Please enter all valid details." });
    }
});

router.get("/getAllTest", function (req, res) {
    Test.find({ isDeleted: false }, function (err, Data) {
        console.log(res.Data)
        if (err) {
            res.json({ status: "ERROR", msg: "Managers details not found." });
        } else {
            res.json({
                status: "ok",
                msg: "Managers details get successfully",
                data: Data
            });
        }
    });
});

// router.post("/getManagerById", function (req, res) {
//     if (req.body._id) {
//         Manager.findOne({ _id: req.body._id }, function (err, Data) {
//             if (err || !Data) {
//                 res.json({ status: "ERROR", msg: "Managers details not found." });
//             } else {
//                 res.json({
//                     status: "ok",
//                     msg: "Managers details get successfully",
//                     data: Data
//                 });
//             }
//         });
//     } else {
//         res.json({ status: "ERROR", msg: "Please enter manager id." });
//     }
// });

// router.post("/deleteManager", function (req, res) {
//     if (req.body._id) {
//         Manager.findOneAndUpdate({ _id: req.body._id }, { $set: { isDeleted: true } }, { new: true }, function (err, Data) {
//             if (err || !Data) {
//                 res.json({ status: "ERROR", msg: "Managers details not found." });
//             } else {
//                 res.json({
//                     status: "ok",
//                     msg: "Managers details removed successfully"
//                 });
//             }
//         });
//     } else {
//         res.json({ status: "ERROR", msg: "Please enter manager id." });
//     }
// });

// router.post('/updateManager', function (req, res) {
//     if (req.body._id) {

//         Manager.findOneAndUpdate({ _id: req.body._id }, {
//             $set: {
//                 instituteName: req.body.instituteName,
//                 institutePhone: req.body.institutePhone,
//                 address: req.body.address,
//                 managerName: req.body.managerName,
//                 email: req.body.email,
//                 managerMobile: req.body.managerMobile,
//                 type: req.body.type
//             }
//         }, { new: true }, function (UErr, UData) {
//             if (UErr || !UData) {
//                 res.json({ status: "ERROR", msg: "Getting some issue." });
//             } else {
//                 res.json({ status: "OK", msg: "Manager updated successfully." });
//             }
//         })
//     } else {
//         res.json({ "status": "ERROR", "msg": "Please enter manager id." })
//     }
// });

module.exports = router;