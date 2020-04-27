const pool = require('../connect_to_db')

function deleter (user, cb){
    const query = {
        text: "DELETE FROM users WHERE username= $1",
        values: [user]
    }
    pool.query(query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return
        } else {
            cb(null, "Success")
            return
        }
    })
}

module.exports = deleter