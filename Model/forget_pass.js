const pool = require('../connect_to_db')

const hash = require('../hash')
const hasher = hash.hasher

function check(user, email, cb){

    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values:[user]
    }

    pool.query(query, (err, res)=>{
        if(err){
            const data = "Error"
            cb(err, data) 
            return
        } else {
            if(res.rows[0].email == email){
                const data = true
                cb(null, data)
                return
            } else {
                const data = "Incorrect email!"
                cb(null, data)
                return
            }
        }
    })
}

function change(user, rand_pass, new_salt, cb){
    const password = hasher(rand_pass, new_salt)
    const query = {
        text: 'UPDATE users SET password = $1, salt = $2 WHERE username = $3',
        values: [password, new_salt, user]
    }

    pool.query(query, (err, res)=>{
        if(err){
            const data = 'Error' 
            cb(err, data)
            return
        } else {
            const data = 'Password successfully changed!' 
            cb(null, data)
            return
        }
    })
}

module.exports.check = check
module.exports.change = change