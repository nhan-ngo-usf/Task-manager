const express = require('express')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const mongodb = require('mongodb')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   res
//     .status(503)
//     .send('Server is currently under maintenance. Please come back later!!!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')
