const moongose = require('mongoose')
const  mongoosePaginate = require('mongoose-paginate-v2')

const validateName = function (value) {
    var regex = /^[a-z]+$/i
    return regex.test(value)
}

const validateEmail = function (value) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(value)
}

const contactSchema = moongose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: false,
        required: 'Name is required',
        validate: [validateName, 'Please fill a Name']
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Last name is required',
        validate: [validateName, 'Please fill a Last name']
    },
    company: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^[a-z ,.'-]+$/i, 'Invalid company name']
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Invalid email address']
    }
})

mongoosePaginate.paginate.options = { 
    page: 1,
    limit: 10
};
contactSchema.plugin(mongoosePaginate)

module.exports = moongose.model('contactModel', contactSchema)