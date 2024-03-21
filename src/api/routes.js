const {Router} = require('express')
const router = Router()
const {UserExistence} = require('../middlewares/user_existence')
const {FieldsValidation} = require('../middlewares/fieldsvalidation')
const {Authentication} = require('../middlewares/authentication')
const {Login} = require('../security/jwt')
const{GetAll, GetOne, updateAll, create, exclude}=require('../controller/controllers')



router.get('/registrations', GetAll)
router.get('/registrations/:id', UserExistence, GetOne)

router.post('/registrations/sign-in', Authentication, Login)
router.post('/registrations/sign-up', FieldsValidation, create)

router.put('/registrations/:id', UserExistence, FieldsValidation, updateAll)
router.delete('/registrations/:id', UserExistence, exclude)



module.exports = router