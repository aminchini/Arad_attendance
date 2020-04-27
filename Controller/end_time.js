const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const end_time = require('../Model/end_time')
const timing = end_time.timing
const status = end_time.status
const duration = end_time.duration

const give_info = require('../give_info')

router.post('/end_time', verifyToken, (req, res)=>{
    console.log("Trying to end time...")

    const user = req.body.user_name
    const e_time = req.body.e_time
    const date = req.body.date
    const the_day = req.body.day
    
    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            give_info(user, (err, result)=>{
                if(err){
                    res.json(result)
                } else {
                    duration(result.user_id, e_time, date, (err1, res1)=>{
                        if(err1){
                            res.json(result)
                        } else {
                            timing(e_time, res1, result.user_id, the_day, date, (er, rs)=>{
                                if(er){
                                    res.json(rs)
                                } else {
                                    status(result.user_id, (erer,rsrs)=>{
                                        res.json(rsrs)
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