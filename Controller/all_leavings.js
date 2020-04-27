const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const all_leavings = require('../Model/all_leavings')
const report = all_leavings.report

router.post('/all_leavings', verifyToken, (req, res)=>{
    console.log("Trying to give all leaving...")

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
      if(auth_err) {
          res.sendStatus(403)
      } else {
        report((er, rs)=>{               
        res.json(rs)
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