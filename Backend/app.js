
require('dotenv').config({path:'./Backend/.env' , override:true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const database = require('./util/database');
const userModel = require('./models/user');
const  expenseModel = require('./models/expense');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');

const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoute);

app.use('/expense',expenseRoute);

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);


database
.sync()
.then(()=>{
    
    app.listen(process.env.PORT);
})
.catch(err => console.log(err));
// .sync({force:true});


