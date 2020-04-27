const pool = require('../connect_to_db')

function give_names(cb){

    const query = {
        text: "SELECT * FROM users WHERE type <> $1",
        values: ["admin"]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            const the_rows = res.rows
            const data = the_rows.map(row =>{
                let name = row.info
                let user_name = row.username
                let status = row.status
                return {name: name, user_name: user_name, status: status}
            })
            cb(null, data)
            return
        }
    })
}

module.exports.give_names = give_names