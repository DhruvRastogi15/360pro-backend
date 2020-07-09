var Category = require('../models/Category');
var Admin = require('../models/Admin');


function autoCreateDBS() {
    console.log(" -------------------------------- autoCreateDBS -------------------------------- ");

    Admin.find({}, function (err, Data) {
        if (err) {
            console.log("Getting issur in create Admin", err);
        } else {
            if (Data.length) {
                console.log("Admin already Created", Data.length);
            } else {
                let AdminDetails = new Admin({
                    name: "admin",
                    email: "admin@digichorus.com",
                    password: "$2a$10$.tR.b7NzNo72VbCUH90pheFrxVXCD8FXIaLk1Wwn6nX/wuACM28hS"
                });
                AdminDetails.save(AdminDetails, function (adminSaveErr, adminSaveData) {
                    if (adminSaveErr) {
                        console.log("Getting issue in Create Admin. ", adminSaveErr);
                    } else {
                        console.log("Admin created successfully.");
                    }
                })
            }
        }
    })






}
autoCreateDBS();












module.exports = autoCreateDBS;