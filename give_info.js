const pool = require('./connect_to_db')

function give_info(user, cb){

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
            const data = res.rows[0]
            cb(null, data)
            return
        }
    })
}

module.exports = give_info