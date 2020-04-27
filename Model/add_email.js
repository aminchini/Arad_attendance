const pool = require('../connect_to_db')

function add (user, email, cb){
    const query = {
        text:'UPDATE users SET email=$1::text WHERE username=$2::text',
        values:[email, user]
    }
    pool.query(query, (err, res)=>{
        if(err){
            const data = 'Error'
            cb(err, data)
            return
        } else {
            const data = 'Email successfully added!'
            cb(null, data)
            return
        }
    })
}

module.exports = add