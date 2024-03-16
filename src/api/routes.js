const {Router} = require('express')
const router = Router()

const { GetAll, GetOne, updateSome, updateAll, create, exclude } = require('../controller/controllers')

router.get('/registration', GetAll)
router.get('/registration/:id', GetOne)
router.post('/registration', create)
router.put('/registration/:id', updateAll)
router.patch('/registration/:id', updateSome)
router.delete('/registration/:id', exclude)

module.exports = router