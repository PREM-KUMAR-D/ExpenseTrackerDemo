require('dotenv').config({ path: './.env', override: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const database = require('./util/database');
const userModel = require('./models/user');
const expenseModel = require('./models/expense');
const orderModel = require('./models/order');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const ForgotPassword = require('./models/forgotPassword');

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname , 'access.log'),{
    flags:'a' 
})


app.use(cors());

app.use(helmet());

app.use(morgan('combined' , {stream: accessLogStream}));

app.use(bodyParser.json());

app.use('/user', userRoute);

app.use('/expense', expenseRoute);

app.use('/purchase', purchaseRoute);

app.use('/premium', premiumRoute);

app.use((req,res,next)=>{

    res.sendFile(path.join(__dirname , `public/${req.url}`));
})

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

userModel.hasMany(ForgotPassword);
ForgotPassword.belongsTo(userModel);


database
    .sync()
    // .sync({ force: true })
    .then(() => {

        app.listen(process.env.PORT);
    })
    .catch(err => console.log(err));


