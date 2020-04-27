const pool = require('../connect_to_db')

function leaving (id, type, time_type, from_date, to_date, description, request_time, name, cb){
    const query = {
        text: "INSERT INTO leaving (user_id, type, time_type, from_date, to_date, description, request_time, status, the_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [id, type, time_type, from_date, to_date, description, request_time, "unseen", name]
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

function admin_email(cb){

    const query = {
        text: 'SELECT * FROM users WHERE type = $1',
        values: ["admin"]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Admin email not found!"
            cb(err, data) 
            return
        } else {
            const data = res.rows[0].email
            cb(null, data)
            return
        }
    })
}

module.exports.leaving = leaving
module.exports.admin_email = admin_email