const pool = require('../connect_to_db')

const hash = require('../hash')
const hasher = hash.hasher

function check (user, pass, cb){

    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [user]
    }

    pool.query(query, (err,res)=>{
        if(err){
            const data = 'Error'
            cb(err, data) 
            return
        }
        else if(res.rows.length == 0){
            const data = 'User not found!'
            const er = Error('Error')
            cb(er, data)
            return
        }
        else{
            if(res.rows[0].password === hasher(pass, res.rows[0].salt)){
                const data = true
                cb(null, data)
                return
            } else {
                const data = "Incorrect password!"
                const er = Error('Error')
                cb(er, data)
                return
            }
        }
    })
}

function change(user, new_pass, salt, cb){
    const password = hasher(new_pass, salt)
    const query = {
        text: 'UPDATE users SET password = $1, salt = $2 WHERE username = $3',
        values: [password, salt, user]
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

module.exports.checker = check
module.exports.changer = change