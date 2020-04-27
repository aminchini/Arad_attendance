const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const changer = require('../Model/forget_pass')
const change = changer.change
const check = changer.check

const give_info = require('../give_info')

const salter = require('../salt')
const rand_pass = salter.salt
const new_salt = salter.salt

const emailer = require('../email')

router.post('/forget_pass', (req, res)=>{
    console.log("Trying for forget password...")

    const user = req.body.user_name
    const email = req.body.email        
    give_info(user, (err, result)=>{
        if(err){
            res.json(result)
        } else {
            check(user, email, (errr, resu)=>{
                if(errr){
                    res.json(resu)
                } else {
                    if (resu === true){
                        change(user, rand_pass, new_salt, (er, rs)=>{
                            if(er){
                                res.json(rs)
                            } else {
                                emailer(
                                    result.email,
                                    "تغییر رمز عبور",
                                    `<!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <title>Title</title>
                                    </head>
                                    <body>
                                    <div id="message_box" dir="rtl" style="text-align: center;">
                                        <img src="https://drive.google.com/open?id=1s_C5zKdU_SG0TI1kOPYdxr_SZqYSw--D" alt="" style="width: 250px;">
                                        <h1>کاربر عزیز سلام</h1>
                                        <center>
                                            <div id="password_box" style="background: #541b7a;
                                            width: 250px;">
                                                <h4 style=" width: 100%;
                                                background: #ed0036;
                                                color: #ffffff;">گذرواژه جدید شما: </h4>
                                                <h5 style="color: #ffffff;">
                                                    ${rand_pass}
                                                </h5>
                                            </div>
                                        </center>
                                    </div>
                                    </body>
                                    </html>`,
                                    (eror, respond)=>{
                                    if(respond == false){
                                        res.json("Error")
                                    } else {
                                        res.json("success")
                                    }
                                })
                            }
                        })
                    } else {
                        res.json(resu)
                    }
                }
            })
        }
    })
})


module.exports = router