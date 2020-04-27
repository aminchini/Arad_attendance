const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const give_user_name = require('../Model/give_user_name')

router.post('/give_user_name', verifyToken, (req, res)=>{
    console.log("Trying to give username...")

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {         
            give_user_name((err, result)=>{
                res.json(result)
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