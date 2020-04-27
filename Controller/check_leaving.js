const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const check_leaving = require('../Model/check_leaving')
const checker = check_leaving.check

const give_info = require('../give_info')

router.post('/check_leaving', verifyToken, (req, res)=>{
    console.log("Trying to check for a leaving request...")

    const user = req.body.user_name

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            give_info(user, (err, result)=>{
                if(err){
                    res.json(result)
                } else {
                    checker(result.user_id, (er, rs)=>{           
                        res.json(rs)
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