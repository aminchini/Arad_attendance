const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const give_start_time = require('../Model/give_start_time')

const give_info = require('../give_info')

router.post('/give_start_time', verifyToken, (req, res)=>{
    console.log("Trying to give start time...")

    const user_name = req.body.user_name
    const date = req.body.today

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else { 
            give_info(user_name, (er, rs)=>{
                if(er){
                    res.json(rs)
                } else {
                    give_start_time(rs.user_id, date, (err,result)=>{
                        res.json(result)   
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