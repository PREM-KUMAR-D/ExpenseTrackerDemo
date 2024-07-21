const uuid = require('uuid');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const bcrypt = require('bcrypt');
const brevo = require('@getbrevo/brevo');

const User = require('../models/user');
const Forgot = require('../models/forgotPassword');

let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_KEY;

exports.forgotPassword = async (req, res, next) => {


    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {

            const forgot = new Forgot({ active: true, user: user });

            await forgot.save();


            let apiInstance = new brevo.TransactionalEmailsApi();
            let sendSmtpEmail = new brevo.SendSmtpEmail();
            const backendHost = process.env.BACKEND_HOST;

            sendSmtpEmail.subject = "{{params.subject}}";
            sendSmtpEmail.htmlContent = "<a href='http://{{params.host}}:4000/password/reset-password/{{params.id}}'>Reset password</a>";
            sendSmtpEmail.sender = { "name": "Admin", "email": "premkumar88845@gmail.com" };
            sendSmtpEmail.to = [
                { "email": email, "name": "Subscriber" }
            ];
            sendSmtpEmail.params = { "id": forgot._id, "subject": "Password reset link for Expense Tracker", "email": email, "host": backendHost };
            const returnData = await apiInstance.sendTransacEmail(sendSmtpEmail);

            console.log(returnData);

        }

    } catch (error) {
        console.error(error);
        return res.json({ message: error, sucess: false });

    }

}

exports.resetPassword = async (req, res, next) => {
    const id = req.params.id;
    try {




        await Forgot.findByIdAndUpdate(new ObjectId(id), { active: false });
        res.status(200).send(`<html>
                                        <script>
                                            function formsubmitted(e){
                                                e.preventDefault();
                                                console.log('called')
                                            }
                                        </script>
    
                                        <form action="/password/update-password/${id}" method="get">
                                            <label for="newpassword">Enter New password</label>
                                            <input name="newpassword" type="password" required></input>
                                            <button>reset password</button>
                                        </form>
                                    </html>`
        )
        res.end();



    } catch (error) {
        console.log(error);
        return res.json({ message: error, sucess: false });
    }

}


exports.updatePassword = async (req, res, next) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const resetPasswordRequest = await Forgot.findById(resetpasswordid);


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hash = await bcrypt.hash(newpassword, salt);

        const user = await User.findByIdAndUpdate(resetPasswordRequest.user, { password: hash });


        return res.status(201).json({ message: 'Successfuly updated the new password' });


    }

    catch (error) {
        return res.status(403).json({ error, success: false })
    }

}