const dotenv = require('dotenv').config({ path: './.env', override: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');


const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const forgotPasswordRoute = require('./routes/resetPassword');
const userRoute = require('./routes/user');


const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})


app.use(cors());

// app.use(helmet());

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use('/user', userRoute);

app.use('/expense', expenseRoute);

// app.use('/purchase', purchaseRoute);

// app.use('/premium', premiumRoute);

app.use('/password', forgotPasswordRoute);

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    
    app.listen(process.env.PORT);
    console.log('Connected to db!');
})
.catch(err => console.log(err));

