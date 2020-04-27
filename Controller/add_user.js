const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const adder = require('../Model/add_user')
const add = adder.add
const existence = adder.existence

const salter = require('../salt')
const salt = salter.salt

router.post('/add_user', verifyToken, (req, res) =>{
  console.log("Trying to creat a new user...")

  const userName = req.body.add_user_name
  const passWord = req.body.add_pass_word
  const type = req.body.add_type
  const info = req.body.info

  jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
    if(auth_err) {
      res.sendStatus(403)
    } else {
      existence(userName, (er,rs)=>{
        if(er){
          res.json(rs)
        } else {
          if(rs == false){
            add(userName, passWord, type, info, salt, (err, result) =>{
              res.json(result)
            })
          } else {
            res.json(rs)
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