const Contact = require('../models/Contact')

const getAllContact = (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: 'All data',
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                msg: 'error occured',
                error: err
            })
        })
}

const postNewContact = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    
    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'data added',
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                msg: 'error occured',
                error: err
            })
        })
}

const getSingleContact = (req, res, next) => {
    let id = req.params.id
    console.log(id)
    Contact.findById(id)
        .then(contact => {
            res.json({
                contact
            })
        })
        .catch(err => console.log(err))
}

const deleteContact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(result => {
            res.json({
                msg: 'deleted',
                result
            })
        })
        .catch(err => console.log(err))
}

const editContact = (req, res, next) => {
    let id = req.params.id

    let updatedContact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    Contact.findByIdAndUpdate(id, {$set: updatedContact })
        .then(contact => {
            Contact.findById(contact._id)
                .then(newContact => {
                    res.json({
                        message: 'successfully updated',
                        newContact
                    })
                })
        })
        .catch(err => console.log(err))
}

module.exports = {
    getAllContact,
    postNewContact,
    getSingleContact,
    deleteContact,
    editContact
}