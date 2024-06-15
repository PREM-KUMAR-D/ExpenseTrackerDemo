const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = (req, res, next) => {

    const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log(user);
    User.findByPk(user.userId)
    .then(user => {

        if(user === null){
            return res.status(401).json({succcess:false});
        }


        console.log(JSON.stringify(user));
        req.user = user;
        next();
    })
    .catch(err => console.log(err));

}

module.exports = authenticate;