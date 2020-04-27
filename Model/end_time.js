const pool = require('../connect_to_db')
const moment = require('moment')

function duration (id, e_time, date, cb){
    const query = {
        text: "SELECT * FROM timing WHERE user_id = $1 AND date = $2",
        values: [id, date]
    }
    pool.query(query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return
        } else {
            const s_time = res.rows[0].start_time
            const startTime = moment(s_time, "HH:mm")
            const endTime = moment(e_time, "HH:mm")
            const duration = moment.duration(endTime.diff(startTime))
            const hours = parseInt(duration.asHours())
            const minutes = parseInt(duration.asMinutes())%60
            const data = hours + ":" + minutes
            cb(null, data)
            return
        }
    })
}

function timing (e_time, duration, id, the_day, date, cb){
    query = {
        text: "UPDATE timing SET end_time = $1, total_time = $2, the_day = $3 WHERE user_id = $4 AND date = $5",
        values: [e_time, duration, the_day, id, date]
    }
    pool.query(query, (err, res)=>{
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
    user_query = {
        text: "UPDATE users SET status = $1 WHERE user_id = $2",
        values:["off", id]
    }
    pool.query(user_query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return 
        } else {
            const data = "off"
            cb(null, data)
            return
        }
    })
}

module.exports.timing = timing
module.exports.status = update_status
module.exports.duration = duration