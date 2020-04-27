const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const change = require('../Model/change_password')
const checker = change.checker
const changer = change.changer
const salter = require('../salt')
const salt = salter.salt

router.post('/change_password', verifyToken, (req, res)=>{
    console.log("Trying to check a user...")
    const user = req.body.username
    const old_pass = req.body.old_pass
    const new_pass = req.body.new_pass

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {        
            checker(user, old_pass, (err,result)=>{
                if(err){
                    res.json(result)
                }
                if(result === true){
                    changer(user, new_pass, salt, (er,rs)=>{
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