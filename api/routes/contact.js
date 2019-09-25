const router = require('express').Router()
const Contact = require('../models/Contact')
const contactController = require('../controllers/contactController')


router.get('/', contactController.getAllContact)

router.post('/', contactController.postNewContact)



router.get('/:id', contactController.getSingleContact)
router.delete('/:id', contactController.deleteContact)
router.put('/:id', contactController.editContact)

module.exports = router