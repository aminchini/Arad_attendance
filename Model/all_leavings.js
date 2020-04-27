const pool = require('../connect_to_db')

function report (cb){
    const query = {
        text: "SELECT * FROM leaving WHERE status = $1 ORDER BY leave_id DESC",
        values: ["unseen"]
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