const pool = require('../connect_to_db')

const hash = require('../hash')
const hasher = hash.hasher

var checker = function (user, pass, cb){
    
    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [user]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = {result:false, type:"Error"}
            cb(err, data) 
            return
        }
        else if(res.rows.length == 0){
            const data = {result:false, type:"User not found!"}
            const er = Error('Error')
            cb(er, data)
            return
        } else {
            if(res.rows[0].password == hasher(pass, res.rows[0].salt)){
                const data = res.rows[0].type
                cb(null, data)
                return
            } else {
                const data = {result:false, type:"Incorrect password"}
                const er = Error('Error')
                cb(er, data)
                return
            }
        }
    })
}

module.exports = checker
