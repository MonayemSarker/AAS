const approvalController = require('../controller/approvalController')
const router = require('express').Router()

// router.get('/:email/get', approvalController.getStudentInfo);
router.get('/:email/get', approvalController.getAllInfo)
router.put('/approve', approvalController.approve)

module.exports = router