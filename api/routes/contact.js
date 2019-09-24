const router = require('express').Router()


const contacts = []

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "contact get route",
        contacts
    })
})

router.post('/:id', (req, res, next) => {
    res.json({
        id: req.params.id
    })
})

router.post('/', (req, res, next) => {
    const { name, email } = req.body
    contacts.push({
        name: name,
        email: email
    })
    res.json({
        message: "data added"
    })
})

module.exports = router