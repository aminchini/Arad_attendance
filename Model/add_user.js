const pool = require('../connect_to_db')

const hash = require('../hash')
const hasher = hash.hasher

function add(user, pass, type, info, salt, cb){
    var password = hasher(pass, salt)

    if(type == 'admin'){
        let query = {
            text: 'INSERT INTO users(username, password, salt, type, email, info, status) VALUES($1, $2, $3, $4, $5, $6, $7)',
            values: [user, password, salt, type, '', info, 'off']
        }
        pool.query(query, (err, res) =>{
            if(err){
                const data = "Error"
                cb(null, data)
                return
            } else {
                const data = 'User added'
                cb(null, data)
                return
            }
        })
    }
    
    if(type == 'user'){
        let query = {
            text: 'INSERT INTO users(username, password, salt, type, info, email, status) VALUES($1, $2, $3, $4, $5, $6, $7)',
            values: [user, password, salt, type, info, '', 'off']
        }
        pool.query(query, (err, res) =>{
            if(err){
                const data = "Error"
                cb(null, data)
                return
            } else {
                const data = 'User added'
                cb(null, data)
                return
            }
        })
    }
}

var existence = function (user_name, cb){
    
    const query = {
        text: "SELECT * FROM users WHERE username = $1 ",
        values: [user_name]
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
        }
        if(res.rows.length !== 0){
            const data = "User exist!"
            cb(null, data)
            return
        }
    })
}

module.exports.add = add
module.exports.existence = existence