const pool = require('../connect_to_db')

function check (user, cb){

    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [user]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        }
        else if(res.rows.length == 0){
            const data = "User not found!"
            const er = Error('Error')
            cb(er, data)
            return
        }
        else{
            if(res.rows[0].status == "on"){
                const data = "on"
                cb(null, data)
                return
            }if(res.rows[0].status == "off"){
                const data = "off"
                cb(null, data)
                return
            }
        }
    })
}

module.exports.checker = check