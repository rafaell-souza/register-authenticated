import 'express-async-errors' // this package is used to handle async errors
import 'dotenv/config' // this package is used to handle environment variables

import express from 'express'
const server = express()
import routes from './routes.js'
import bodyparser from 'body-parser'
import { errorApi } from '../../middlewares/error.js'

server.use(bodyparser.urlencoded({extended: true}))
server.use(routes)
server.use(errorApi)


server.listen(process.env.PORT, () => {
console.log(`Server running at http://localhost:${process.env.PORT}`)
})