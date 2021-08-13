const express = require('express')
require('./db/mongoose')
// const studentRouter = require('./routers/student')
const collegeRouter = require('./routers/college')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
// app.use(studentRouter)
app.use(collegeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})