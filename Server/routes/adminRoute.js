const adminController = require('../controller/adminController')
const router = require('express').Router()

router.post('/add', adminController.addAdmin);
router.get('/:email', adminController.getAdmin);
router.put('/:email', adminController.updateAdmin)

module.exports = router