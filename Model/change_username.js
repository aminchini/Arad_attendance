const pool = require('../connect_to_db')

const hash = require('../hash')
const hasher = hash.hasher

function check (old_user, pass, cb){

    const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [old_user]
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

function change(new_user, old_user, cb){
    const query = {
        text: 'UPDATE users SET username = $1 WHERE username = $2',
        values: [new_user, old_user]
    }
    pool.query(query, (err, res)=>{
        if(err){
            const data = 'Error'
            cb(err, data)
            return
        } else {
            const data = 'User name successfully changed!'
            cb(null, data)
            return
        }
    })

}

module.exports.checker = check
module.exports.changer = change