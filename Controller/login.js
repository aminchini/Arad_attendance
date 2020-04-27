const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const check = require('../Model/login')

router.post('/login', (req, res)=>{
  console.log("Trying to check a user...")

  const userName = req.body.user_name
  const passWord = req.body.pass_word
  const user = {
    user_name : userName,
    pass_word: passWord
  }
  check(userName, passWord, (err1,result)=>{
    if(err1){
      res.json(result)
    } else {
      jwt.sign({user}, 'secretkey', { expiresIn: 60 * 15 }, (err, token) => {
        res.json({
          token: token,
          result:true,
          type: result
        })
      })
    }
  })
})

router.get('/', (req, res) =>{
    res.json({message:'hello world'})
})

module.exports = router