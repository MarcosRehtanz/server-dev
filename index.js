const express = require('express')
const app = express()
const PORT = 3001
const server = require('./src/server.js')
const { conn } = require('./src/db.js')

conn.sync({force:true}).then(() => {

    app.listen(PORT, () => {
        console.log('Server started')
        console.log(conn.models)
    })
})

app.use(server)