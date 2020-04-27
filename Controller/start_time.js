const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const start_time = require('../Model/start_time')
const timing = start_time.timing
const status = start_time.status

const give_info = require('../give_info')

router.post('/start_time', verifyToken, (req, res)=>{
    console.log("Trying to register time...")

    const user = req.body.user_name
    const s_time = req.body.s_time
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
                    timing(s_time, result.user_id, date, the_day, (er, rs)=>{
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