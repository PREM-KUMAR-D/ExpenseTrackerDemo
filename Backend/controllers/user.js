const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');



function generateAccessToken(jsonVal) {
    return jwt.sign(JSON.stringify(jsonVal), process.env.SECRET_KEY);


}


exports.postLoginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({
        where: {
            email: email
        }
    })
    .then(data => {


        if (data === null) {
            res.status(404).json({ error: "No user with this email present please Signup Or use the correct email !" });
            return;
        }

        bcrypt.compare(password, data.password, (err, resBoolean) => {

            if (err) {
                res.status(503).json({ error: "Something went wrong!" });
            }

            if (!resBoolean) {
                res.status(401).json({ error: "Password Incorrect" });
                return;
            }
            else {
                res.status(200).json(data);
            }
        })

        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

}




exports.postAddUser = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, result) => {

        if (err) {
            console.log(err)
            return;
        }


        userModel.create({ name: name, email: email, password: result })
            .then(data => {
                res.status(201).json({ message: "Success", data: data, token: generateAccessToken(data) });

            })
            .catch(err => {

                // console.log(err);
                if (err.toString() === 'SequelizeUniqueConstraintError: Validation error') {
                    res.status(403).json({ error: "Email already exists! Please Signup with new email" });
                    return;
                }


            });

    })






}



