import 'dotenv/config'
import express from 'express'
const server = express()
import routes from './routes.js'
import bodyparser from 'body-parser'


server.use(bodyparser.urlencoded({extended: true}))
server.use(routes)





server.listen(process.env.PORT, () => {
console.log(`Server running at http://localhost:${process.env.PORT}`)
})