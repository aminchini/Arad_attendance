const pool = require('../connect_to_db')

function report (id, cb){
    const query = {
        text: "SELECT * FROM leaving WHERE user_id = $1 AND status = $2 ORDER BY leave_id DESC",
        values: [id, "unseen"]
    }
    pool.query(query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data)
            return
        } else {
            const data = res.rows
            cb(null, data)
            return
        }
    })
}

module.exports.report = report