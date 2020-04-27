const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const answer_leaving = require('../Model/answer_leaving')
const answer = answer_leaving.answer
const timing = answer_leaving.timing
const leave_date = answer_leaving.leave_date
const give_info = answer_leaving.give_info

const emailer = require('../email')

router.post('/answer_leaving', verifyToken, (req, res)=>{
    console.log("Trying to answer a leaving request...")

    const user = req.body.user_id
    const ag_or_disag = req.body.ag_or_disag
    const datails = req.body.details
    const answer_time = req.body.answer_time
    const leave_id = req.body.leave_id

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {        
            give_info(user, (err, result)=>{
                if(err){
                    res.json(result)
                    return
                } else {
                    answer(leave_id, ag_or_disag, datails, answer_time, (er, rs)=>{
                        if(er)
                        {
                            res.json(rs)
                        } 
                        else 
                        {
                            // res.json(rs)
                            if(ag_or_disag == 'agree')
                            {
                                emailer(result.email, "جواب مرخصی", '<h2>'+'موافقت شد'+answer_time+' در ساعت'+' با درخواست مرخصی شما'+'</h2>', (eror, respond)=>{
                                    if(respond == false){
                                        res.json('Email not send')
                                    } else {
                                        res.json('Email sent')
                                    }
                                })
                                leave_date(user, (er1,rs1)=>{
                                    if(er1){
                                        res.json(rs1)
                                    } else {
                                        timing(user, rs1.from_date, rs1.to_date, (er2, rs2)=>{
                                            // res.json(rs2)
                                        })
                                    }
                                })
                            } else {
                                emailer(
                                    result.email,
                                    "جواب مرخصی",
                                    '<h2>'+'رد شد'+answer_time+' در ساعت'+'  درخواست مرخصی شما'+'</h2>',
                                    (eror, respond)=>{
                                    if(respond == false){
                                        res.json('Email not send')
                                    } else {
                                        res.json('Email sent')
                                    }
                                })
                            }
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