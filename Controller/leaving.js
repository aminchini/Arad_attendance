const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const leave = require('../Model/leaving')
const leaving = leave.leaving
const admin_email = leave.admin_email

const give_info = require('../give_info')

const emailer = require('../email')

router.post('/leaving', verifyToken, (req, res)=>{
    console.log("Trying to creat leaving request...")

    const user = req.body.user_name
    const type = req.body.type
    const time_type = req.body.time_type
    const from_date = req.body.from_date
    const to_date = req.body.to_date
    const description = req.body.description
    const request_time = req.body.request_time

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            give_info(user, (err, result)=>{
                if(err){
                    res.json(result)
                } else {
                    leaving(result.user_id, type, time_type, from_date, to_date, description, request_time, result.info, (er, rs)=>{                
                        res.json(rs)           
                    })
                }
            })
        
            give_info(user, (err, result)=>{
                if(err){
                    res.json("Error in sending email")
                } else {
                    admin_email((er, rs)=>{
                        if(er){
                            res.json(rs)
                        } else {
                            emailer(rs, "درخواست مرخصی", '<h2>'+'.درخواست مرخصی داده اند'+request_time+' در ساعت'+result.info+'آقای'+'</h2>', (eror1, respond1)=>{
                                if(respond1 == false){
                                    res.json("Email not send")
                                } else {
                                    emailer(result.email, "درخواست مرخصی", '<h2>'+'.برای ادمین ارسال شد'+request_time+' درخواست مرخصی شما در ساعت'+'<h2>', (eror2, respond2)=>{
                                        if(respond2 == false){
                                            res.json("Email not send")
                                        } else {
                                            res.json("Emails sent")
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ')
      // Get token from array
      const bearerToken = bearer[1]
      // Set the token
      req.token = bearerToken
      // Next middleware
      next()
    } else {
      // Forbidden
      res.sendStatus(403)
    }
}

module.exports = router