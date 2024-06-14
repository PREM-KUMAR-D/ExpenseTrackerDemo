const userModel = require('../models/user');


exports.postLoginUser = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    userModel.findByPk(email)
    .then( data => {

        if(data === null){
            res.status(404).json({error: "No user with this email present please Signup Or use the correct email !"});
            return ;
        }

        if(data.password !== password ){
            res.status(401).json({error: "Password Incorrect"});
            return ;
        }
        else {
            res.status(200).json(data);
        }

        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    })

}




exports.postAddUser = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;



    userModel.create({ name: name, email: email, password: password })
        .then(data => {
            res.status(201).json(data);

        })
        .catch(err => {

            // console.log(err);
            if (err.toString() === 'SequelizeUniqueConstraintError: Validation error') {
                res.status(403).json({ error: "Email already exists! Please Signup with new email" });
                return;
            }


        });



}