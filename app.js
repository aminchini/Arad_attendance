const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('combined'))

const login = require('./Controller/login')
app.use(login)

const report = require('./Controller/reporter')
app.use(report)

//Admin
const info = require('./Controller/info')
app.use(info)

const give_users_info = require('./Controller/give_users_info')
app.use(give_users_info)

const give_user_name = require('./Controller/give_user_name')
app.use(give_user_name)

//Settings
const add_user = require('./Controller/add_user')
app.use(add_user)

const add_email = require('./Controller/add_email')
app.use(add_email)

const change_username = require('./Controller/change_username')
app.use(change_username)

const change_password = require('./Controller/change_password')
app.use(change_password)

const delete_user = require('./Controller/delete_user')
app.use(delete_user)

const forget_pass = require('./Controller/forget_pass')
app.use(forget_pass)

//Timings
const start_time = require('./Controller/start_time')
app.use(start_time)

const end_time = require('./Controller/end_time')
app.use(end_time)

const give_start_time = require('./Controller/give_start_time')
app.use(give_start_time)

const give_end_time = require('./Controller/give_end_time')
app.use(give_end_time)

const check_started = require('./Controller/check_started')
app.use(check_started)

const check_status = require('./Controller/check_status')
app.use(check_status)

const check_work = require('./Controller/check_working')
app.use(check_work)

//Leaving
const leaving = require('./Controller/leaving')
app.use(leaving)

const check_leaving = require('./Controller/check_leaving')
app.use(check_leaving)

const answer_leaving = require('./Controller/answer_leaving')
app.use(answer_leaving)

const leaving_report = require('./Controller/leaving_report')
app.use(leaving_report)

const all_leavings = require('./Controller/all_leavings')
app.use(all_leavings)

app.listen(4040, ()=>{
    console.log('Server is listening on 4040...')
})