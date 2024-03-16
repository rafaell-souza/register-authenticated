const {Router} = require('express')
const router = Router()
const controller = require('./controller/rules')

router.get('/registration', controller.GetAll)
router.get('/registration/:id', controller.GetOne)

router.post('/registration', controller.create)

router.put('/registration/:id', controller.updateAll)
router.patch('/registration/:id', controller.updateOne)

router.delete('/registration/:id', controller.exclude)

module.exports = router