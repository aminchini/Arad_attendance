const pool = require('../connect_to_db')

function check(id, cb){

    const query = {
        text: "SELECT * FROM leaving WHERE user_id = $1",
        values:[id]
    }

    pool.query(query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            const data = res.rows
            cb(err, data) 
            return
        }
    })
}

module.exports.check = check