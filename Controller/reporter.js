const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const reporter = require('../Model/reporter')
const report = reporter.report

const give_info = require('../give_info')

router.post('/report', verifyToken, (req, res)=>{
    console.log("Trying to report...")

    const user = req.body.user_name
    const s_date = req.body.s_date
    const e_date = req.body.e_date

    jwt.verify(req.token, 'secretkey', (auth_err, authData) => {
        if(auth_err) {
            res.sendStatus(403)
        } else {           
            give_info(user, (err, result)=>{
                if(err){
                    res.json(result)
                } else {
                    report(result.user_id, s_date, e_date, (er, rs)=>{               
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