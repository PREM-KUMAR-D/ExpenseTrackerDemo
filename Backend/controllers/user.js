const userModel = require('../models/user');



exports.postUser = (req,res,next)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;



     userModel.create({name:name,email:email,password:password})
     .then( data => {
         res.status(201).json(data);
        
     })
     .catch(err =>{

        // console.log(err);
        if(err.toString()  ==='SequelizeUniqueConstraintError: Validation error'){
            res.status(403).json({error:"Email already exists! Please Signup with new email"});
            return ;
        }


     });



}