const razorpay = require('razorpay');


const Order = require('../models/order');
const sequelize = require('../util/database');


exports.purchasePremium = async (req, res, next) => {

    try {
        var rzp = new razorpay({
            key_id: process.env.RZR_ID,
            key_secret: process.env.RZR_SECRET
        })
        const amount = 100;
        const order = await rzp.orders.create({ amount, currency: "INR" });

        await req.user.createOrder({ orderid: order.id, status: 'PENDING' });

        return res.status(201).json({ order, key_id: rzp.key_id });

    } catch (error) {

        console.log(error);
        res.status(403).json({ message: "Something went wrong", error: error });
    }


}

exports.updateTransactionStatus = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const payment_id = req.body.payment_id;
        const order_id = req.body.order_id;
        const order = await Order.findOne({ where: { orderid: order_id } ,transaction: t });

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }, {transaction: t});
        const promise2 = req.user.update({ isPremium: true }, {transaction: t});

        Promise.all([promise1, promise2]).then(() => {
            t.commit();
            return res.status(202).json({ sucess: true, message: " Transaction Successful" });
        })
        .catch((err) => {
                throw new Error(error);
        })

    }
    catch (err) {
        console.log(err);
        t.rollback();
        res.status(403).json({ message: "Something went wrong", error: err });
    }

}