import {Router} from 'express' 

// import middlewares
import { Authentication } from '../../middlewares/authentication.js'
import { Authorization } from '../../middlewares/authorization.js'
import { VerifyFields } from '../../middlewares/fieldsvalidation.js'
// import controllers
import { Controllers } from '../controller/rules.js'

const controllers = new Controllers() 
const routes = Router()

// main route
routes.get('/registrations', (req, res) => {res.json('Sign up to our website!')})

routes.get('/profiles',Authorization, controllers.GetAll)
routes.get('/profiles/:id', Authorization, controllers.GetOne)
routes.post('/sign-up', VerifyFields, controllers.Create)
routes.post('/sign-in', Authentication)
routes.put('/profiles/:id', Authorization, VerifyFields, controllers.Update)
routes.delete('/profiles/:id', Authorization, controllers.Exclude)

export default routes