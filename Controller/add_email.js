const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const add = require('../Model/add_email')

router.post('/add_email', verifyToken, (req, res) =>{
    console.log("Trying to add an email ...")

    var user = req.body.user
    var email = req.body.email
    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {
            add(user, email, (err, result) =>{
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