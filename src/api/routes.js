const {Router} = require('express')
const router = Router()
const {UserCheck} = require('../middlewares/user_existence')
const {FieldsValidation} = require('../middlewares/fieldsvalidation')
const {Authentication} = require('../middlewares/authentication')
const {Login} = require('../security/jwt')
const {authorization} = require('../middlewares/authorization')
const{GetAll, GetOne, updateAll, create, exclude}=require('../controller/controllers')


router.get('/registrations', GetAll)
router.get('/registrations/:id', authorization, UserCheck, GetOne)

router.post('/registrations/sign-in', Authentication, Login)
router.post('/registrations/sign-up', FieldsValidation, create)

router.put('/registrations/:id', UserCheck, FieldsValidation, updateAll)
router.delete('/registrations/:id', UserCheck, exclude)



module.exports = router