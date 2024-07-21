const User = require('../models/user');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




function generateAccessToken(jsonVal) {
    return jwt.sign(JSON.stringify(jsonVal), process.env.SECRET_KEY);
}


exports.postLoginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        
        const user =await User.findOne({ email: email });

        if (!user) {
            res.status(404).json({ error: "No user with this email present please Signup Or use the correct email !" });
            return;
        }

        const resBoolean = await bcrypt.compare(password, user.password)

        if (!resBoolean) {
            res.status(401).json({ error: "Password Incorrect" });
            return;
        }

        res.status(200).json({user: user , token:  generateAccessToken(user)});
    } catch (error) {

        console.log(error);
        return res.status(503).json({ error: "Something went wrong!" });
    }

}


exports.postAddUser = async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;


    try {
        const result = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name: name,
            email: email,
            password: result
        })
        const data = await user.save();
        res.status(201).json({ message: "Success" });

    } catch (error) {

        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(403).json({ error: "Email already exists! Please Signup with new email" });
            return;
        }
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }

}

    










