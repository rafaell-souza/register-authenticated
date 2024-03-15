const express= require('express')
const server = express()
const PORT = 3333
const routes = require('./routes')
const bodyparser = require('body-parser')


server.use(bodyparser.urlencoded({extended: true}))
server.use(routes)
server.use(express.json())





server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})