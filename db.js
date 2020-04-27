const pool = require('./connect_to_db')

//creating the users table
// pool.query("CREATE TABLE users (user_id serial PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), salt VARCHAR(255), email VARCHAR(255), type VARCHAR(255), status VARCHAR(255), info VARCHAR(255) )", (err,res)=>{})

//creating the timing table
// pool.query("CREATE TABLE timing (time_id serial PRIMARY KEY, user_id integer REFERENCES users(user_id), start_time VARCHAR(255), end_time VARCHAR(255), total_time VARCHAR(255), date DATE , the_day VARCHAR(255))", (err,res)=>{})

//creating the leaving table
// pool.query("CREATE TABLE leaving (leave_id serial PRIMARY KEY, user_id integer REFERENCES users(user_id), time_type VARCHAR(255), type VARCHAR(255), from_date VARCHAR(255), to_date VARCHAR(255), description VARCHAR(255), request_time VARCHAR(255), status VARCHAR(255), ag_or_disag VARCHAR(255), result VARCHAR(255), answer_time VARCHAR(255), the_name VARCHAR(255) )", (err,res)=>{})

// const text = 'INSERT INTO users(username, password, salt,  email, type, status) VALUES($1, $2, $3, $4, $5, $6)'
// const values = ['aradadmin', '3ea7d8fd2b62580af41fc8185e8e26618cc67b7cb34eceffc25ee68092ce913529cab808191b3a8b53c144340c5668fabf1afc4ea56dce1ae53561f806607542', '02ea2edc50774b7b', '', 'admin', "off"]
// const val = ['amin_chini', 'e375ae9ba69fde0a033f58c211938a58b55b8fa204df85cc82ccb2dfc8fba9d7ae76988c927b0bd9aa16a5250e590c665c2baf074b54aaadd8ccec8295070ce5', '7bbbf1618af5d579', 'aminm.ch.s@gmail.com', 'user', "off"]

// pool.query(text, values, (err, res) => {
//   if(err) {
//     console.log(err.stack)
//   }
// })

// pool.query(text, val, (err, res) => {
//   if(err) {
//     console.log(err.stack)
//   }
// })

// pool.query("DROP TABLE users, timing, leaving")
// pool.query("DROP TABLE leaving")
pool.end()
