const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact