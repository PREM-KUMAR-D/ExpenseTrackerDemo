const uuid = require('uuid');
const AWS = require('aws-sdk');
const {Parser} = require('json2csv');

const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

const ITEMS_PER_PAGE = 3;

exports.getExpenses = async (req, res, next) => {

    const { page = 1 } = req.query;


    const userId = req.user.userId;

    try {

        const expenses = await Expense.findAll({
            where: { userUserId: userId },
            offset: (page - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE

        });

        const totalExpense = await Expense.count({ userUserId: userId });



        res.status(200).json({
            data: expenses,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalExpense,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalExpense / ITEMS_PER_PAGE)
        });
    } catch (err) {

        console.log(err);
        return res.status(500).json({
            message: "failure",
            success: false
        });

    }





}


exports.addExpense = async (req, res, next) => {

    const t = await sequelize.transaction();

    try {

        const expense = req.body.expense;
        const description = req.body.description;
        const category = req.body.category;

        const userId = req.user.userId;
        const expenseRow = await Expense.create({ expense: expense, description: description, category: category, userUserId: userId }, { transaction: t });

        const totalExpense = Number(req.user.totalExpense) + Number(req.body.expense);

        await User.update({ totalExpense: totalExpense }, { where: { userId: req.user.userId }, transaction: t });

        await t.commit();
        return res.status(201).json({ message: "success", success: true });

    }
    catch (err) {
        await t.rollback();

        return res.status(500).json({
            message: "failure",
            success: false
        });
    }



}

exports.deleteExpense = async (req, res, next) => {

    const id = req.params.id;
    const userId = req.user.userId;
    if (id === undefined || id.length === 0) {
        return res.status(400).json({ success: false });
    }

    try {
        const expense = await Expense.findByPk(id, { where: { userUserId: userId } });
        if (expense === null) {
            return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
        }
        expense.destroy()
        return res.status(200).json({ success: true, message: 'Deleted Succesfully' });

    } catch (err) {

        console.log('failed to destroy : ', err);
        return res.status(500).json({ success: false, message: 'Failed' });
    }

}

exports.downloadExpenses = async (req, res, next) => {
    try {
        if (!req.user.isPremium) {
            return res.status(401).json({ success: false, message: 'User is not a premium User' })
        }

        const data = await req.user.getExpenses();

        const parser = new Parser();
        const csvData = parser.parse(data);

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGION
        });

        const bucketName = 'expense.tracker.demo';
        const blobName = 'expenses' + uuid.v1() + '.csv';


        const params = {
            Bucket: bucketName,
            Key: blobName,
            Body: csvData
            // ContentType: 'text/html'
        };



        s3.upload(params, (err, uploadData) => {
            if (err) {
                console.error("Error uploading data: ", err);
                return res.status(500).json({ error: err, success: false, message: 'Something went wrong' });
            }
            const fileUrl = uploadData.Location;
            res.status(201).json({ fileUrl, success: true });
        });








        
    } catch (err) {
        res.status(500).json({ error: err, success: false, message: 'Something went wrong' })
    }
}