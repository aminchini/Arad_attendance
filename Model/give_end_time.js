const pool = require('../connect_to_db')

function give_end_time(id, date, cb){

    const query = {
        text: "SELECT * FROM timing WHERE user_id= $1 AND date = $2",
        values: [id, date]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            if (res.rows.length == 0){
                const data = null
                cb(null, data)
                return
            } else {
                const data = res.rows[0].end_time
                cb(null, data)
                return
            }
        }
    })
}

module.exports = give_end_time