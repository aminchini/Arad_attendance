const pool = require('../connect_to_db')

var checker = function (id, date, cb){
    
    const query = {
        text: "SELECT * FROM timing WHERE user_id = $1 AND date = $2 ",
        values: [id, date]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error in query!"
            cb(err, data) 
            return
        }
        if(res.rows.length == 0){
            const data = false
            cb(null, data)
            return
        } else {
            const data = true
            cb(null, data)
            return
        }       
    })
}

module.exports = checker