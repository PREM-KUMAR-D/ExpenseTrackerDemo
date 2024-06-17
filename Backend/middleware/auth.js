const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userRow = await User.findByPk(user.userId);

        if (userRow === null) {
            return res.status(401).json({ succcess: false });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}




module.exports = authenticate;