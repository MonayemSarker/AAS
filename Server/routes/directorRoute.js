const directorController = require('../controller/directorController')
const router = require('express').Router()

router.post('/add', directorController.addDirector);
router.get('/:email', directorController.getDirector);
router.put('/:email', directorController.updateDirector)

module.exports = router