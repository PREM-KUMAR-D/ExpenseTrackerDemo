const mongoose = require('mongoose');


const schema = mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    expiresby : {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    }

});

const Forgot = mongoose.model('Forgotpassword',schema);

module.exports= Forgot;