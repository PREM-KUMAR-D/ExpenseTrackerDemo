
require('dotenv').config({path:'./Backend/.env' , override:true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const database = require('./util/database');
const userModel = require('./models/user');
const  expenseModel = require('./models/expense');
const orderModel = require('./models/order');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');

const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoute);

app.use('/expense',expenseRoute);

app.use('/purchase',purchaseRoute);

app.use('/premium',premiumRoute);

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);


database
.sync()
// .sync({force:true})
.then(()=>{
    
    app.listen(process.env.PORT);
})
.catch(err => console.log(err));


