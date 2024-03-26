import {Router} from 'express' 

// import middlewares
import { Authentication } from '../../middlewares/authentication.js'
import { Authorization } from '../../middlewares/authorization.js'
import { VerifyFields } from '../../middlewares/fieldsvalidation.js'

// import controllers
import { Controllers } from '../controller/rules.js'

// instance of controllers
const controllers = new Controllers() 

// instance of routes
const routes = Router()

// free routes
routes.get('/', (request, response) => {return response.json('Welcome to the API')})
routes.post('/sign-up', VerifyFields, controllers.Create)
routes.post('/sign-in', Authentication)

// private routes
routes.use(Authorization) // all routes below will be private
routes.get('/profiles', controllers.GetAll)
routes.get('/profiles/:id', controllers.GetOne)
routes.put('/profiles/:id', VerifyFields, controllers.Update)
routes.delete('/profiles/:id', controllers.Exclude)

export default routes