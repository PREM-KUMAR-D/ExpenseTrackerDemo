const razorpay = require('razorpay');


const Order = require('../models/order');



exports.purchasePremium = async (req, res, next) => {

    try {
        var rzp = new razorpay({
            key_id: process.env.RZR_ID,
            key_secret: process.env.RZR_SECRET
        })
        const amount = 100;
        const order = await rzp.orders.create({ amount, currency: "INR" });

        const newOrder = new Order({
            orderid: order.id,
            status: 'PENDING',
            user: req.user._id 
        });

        await newOrder.save();

        return res.status(201).json({ order, key_id: rzp.key_id });

    } catch (error) {

        console.log(error);
        res.status(403).json({ message: "Something went wrong", error: error });
    }


}

exports.updateTransactionStatus = async (req, res, next) => {
    
    try {
        const payment_id = req.body.payment_id;
        const order_id = req.body.order_id;
        const order = await Order.findOne({ orderid: order_id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }


        const updateOrder = order.updateOne({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const updateUser = User.updateOne({ _id: req.user._id }, { isPremium: true });

        await Promise.all([updateOrder, updateUser]);

        return res.status(202).json({ success: true, message: "Transaction Successful" });

    }
    catch (err) {
        console.log(err);
        
        res.status(403).json({ message: "Something went wrong", error: err });
    }

}