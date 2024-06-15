const razorpay = require('razorpay');
const Order = require('../models/order');
const { where } = require('sequelize');


exports.purchasePremium = async (req, res, next) => {
    try {
        var rzp = new razorpay({
            key_id: process.env.RZR_ID,
            key_secret: process.env.RZR_SECRET
        })
        const amount = 100;
        rzp.orders.create({
            amount,
            currency: "INR"
        }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({
                orderid: order.id,
                status: 'PENDING'
            })
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch(err => {
                    throw new Error(err);
                })

        })
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
}

exports.updateTransactionStatus = async (req, res, next) => {
    try {
        const payment_id = req.body.payment_id;
        const order_id = req.body.order_id;
        const order = await Order.findOne({ where: { orderid: order_id } });

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const promise2 = req.user.update({ isPremium: true });

        Promise.all([promise1,promise2]).then(()=>{

            return res.status(202).json({ sucess: true, message: " Transaction Successful" });
        })
        .catch((err)=>{
            throw new Error(error);
        })

    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }

}