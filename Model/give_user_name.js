const pool = require('../connect_to_db')

function give_username(cb){

    const query = {
        text: "SELECT username FROM users"
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            const users = res.rows
            const data = users.map(user=>{
                return user.username
            })
            cb(null, data)
            return
        }
    })
}

module.exports = give_username