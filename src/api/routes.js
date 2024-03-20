const {Router} = require('express')
const router = Router()

//Middlewares
const {UserExistence} = require('../middlewares/user_existence')
const {FieldsFormats} = require('../middlewares/fieldsformats')

const{GetAll, GetOne, updateAll, create, exclude}=require('../controller/controllers')

router.get('/registration', GetAll)
router.get('/registration/:id', UserExistence, GetOne)
router.post('/registration', FieldsFormats , create)
router.put('/registration/:id', FieldsFormats, updateAll)
router.delete('/registration/:id', exclude)


module.exports = router