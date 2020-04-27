const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const change = require('../Model/change_username')
const checker = change.checker
const changer = change.changer

router.post('/change_username', verifyToken, (req, res)=>{
    console.log("Trying to change username...")
    const old_user = req.body.old_user
    const new_user = req.body.new_user
    const pass = req.body.pass
    
    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            checker(old_user, pass, (err,result)=>{
                if(err){
                    res.json(result)
                }
                if(result === true){
                    changer(new_user, old_user, (er,rs)=>{
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