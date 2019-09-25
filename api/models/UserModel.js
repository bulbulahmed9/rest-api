const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            msg: `{VALUE} is not an email`
        }
    },
    password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User