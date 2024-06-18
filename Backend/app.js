require('dotenv').config({ path: './Backend/.env', override: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');


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


app.use(cors());

app.user(helmet());

app.use(bodyParser.json());

app.use('/user', userRoute);

app.use('/expense', expenseRoute);

app.use('/purchase', purchaseRoute);

app.use('/premium', premiumRoute);

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


