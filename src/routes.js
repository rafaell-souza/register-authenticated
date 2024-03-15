const {Router} = require('express')
const router = Router()
const controller = require('./controller/rules')

router.get('/registration', controller.GetAll)
router.get('/registration/:id', controller.GetOne)
router.post('/registration', controller.create)

module.exports = router