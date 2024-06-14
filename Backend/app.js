const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const database = require('./util/database');
const userModel = require('./models/user');
const userRoute = require('./routes/user');


const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoute);

database
.sync()
// .sync({force:true});



app.listen(4000);