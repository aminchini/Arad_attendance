const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const check = require('../Model/check_status')
const checker = check.checker

router.post('/check_status', verifyToken, (req, res)=>{
    console.log("Trying to check a user status...")
    const user = req.body.username

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            checker(user, (err,result)=>{
                if(err){
                    res.json(result)
                } else {
                    if(result == "on"){
                        res.json(result)
                    }
                    if(result == "off"){
                        res.json(result)
                    }
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