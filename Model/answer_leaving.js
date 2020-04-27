const pool = require('../connect_to_db')
const moment = require('moment')
const jalaali = require('jalaali-js')

function answer(id, ag_or_disag, details, answer_time, cb){

    const query = {
        text: ` UPDATE leaving 
                SET status = $1, result = $2, answer_time = $3 
                WHERE leave_id = $4 ` ,
        values: [ag_or_disag, details, answer_time, id]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error1"
            cb(err, data) 
            return
        } else {
            const data = "Checked"
            cb(null, data)
            return
        }
    })
}

function leave_date(id, cb){

    const query = {
        text: ` SELECT from_date, to_date FROM leaving
                WHERE user_id = $1 AND status != $2`,
        values: [id, "unseen"]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error2"
            cb(err, data) 
            return
        } else {
            const data = res.rows[0]
            cb(null, data)
            return
        }
    })
}

function timing(id, from_date, to_date, cb){

    function getDates(startDate, stopDate) {
        var dateArray = []
        var currentDate = moment(startDate)
        var stopDate = moment(stopDate)
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days')
        }
        return dateArray
    }

    const dates = (getDates(from_date, to_date))

    for (let i = 0 ;i < dates.length ;i++) {

        const Julian_Day_number = jalaali.j2d(Number(dates[i].slice(0, 4)), Number(dates[i].slice(5, 7)), Number(dates[i].slice(8, 10)))
        const ob_ADdate = jalaali.d2g(Julian_Day_number)
        const the_date = ob_ADdate.gy.toString()+"-"+ob_ADdate.gm.toString()+"-"+ob_ADdate.gd.toString()
        const days = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"]
        const dt = new Date(the_date)
        const n = dt.getDay()
        const the_day = days[n]

        const query = {
            text: ` INSERT INTO timing(user_id, start_time, end_time, date, the_day)
                    VALUES($1, $2, $3, $4, $5)`,
            values: [id, "مرخصی", "مرخصی", dates[i], the_day]
        }
    
        pool.query(query, (err,res)=>{
            if(err){
                const data = "Error3"
                cb(err, data) 
                return
            } else {
                const data = "Timing updated!"
                cb(null, data)
                return
            }
        })
    }
} 

function give_info(id, cb){

    const query = {
        text: "SELECT * FROM users WHERE user_id = $1",
        values: [id]
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

module.exports.answer = answer
module.exports.timing = timing
module.exports.leave_date = leave_date
module.exports.give_info = give_info