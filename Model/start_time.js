const pool = require('../connect_to_db')

function timing (s_time, id, date, the_day, cb){
    const time_query = {
        text: "INSERT INTO timing (start_time, user_id, date, the_day) VALUES($1, $2, $3, $4)",
        values: [s_time, id, date, the_day]
    }
    pool.query(time_query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return
        } else {
            const data = "success"
            cb(null, data)
            return
        }
    })
}

function update_status(id, cb){
    const user_query = {
        text: "UPDATE users SET status = $1 WHERE user_id = $2",
        values:["on", id]
    }
    pool.query(user_query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return 
        } else {
            const data = "on"
            cb(null, data)
            return
        }
    })
}

module.exports.timing = timing
module.exports.status = update_status