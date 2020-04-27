const pool = require('../connect_to_db')

function info(user, cb){

    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [user]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            const email = res.rows[0].email
            const name = res.rows[0].info
            cb(null, {email:email, name:name})
            return
        }
    })
}

module.exports = info