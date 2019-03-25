const Contact = require('../models/contact')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateName = function(name) {
    var re = /^[a-z]+$/i;
    return re.test(name)
};

async function getAllContacts(ctx, next){
    try {
        const page = ctx.query.page
        const contacts = await Contact.paginate({}, {page})
        ctx.body = contacts
        return next()
    } catch (error) {
        console.log('Error getting all contacts: ', error)
        return next()
    }
}

async function getContact(ctx){
    try {
        const id = ctx.params.contactId
        const contact = await  Contact.findById(id)
        ctx.status = 200
        ctx.body = contact
    } catch (error) {
        ctx.body = {
            error: `Error, contact doesn't exist`,
        }
        ctx.status = error.status || 400
        console.log('Error finding contact: ', error)
    }
}

async function createContact(ctx){
    const newContact = ctx.request.body
    try {
        let contact = new Contact(newContact)
        const savedContact = await contact.save()
        console.log('Contact saved!')
        ctx.status = 200
        ctx.body = savedContact
    } catch (error) {
        ctx.body = {
            error: 'Error, not a valid contact',
        }
        ctx.status = error.status || 400
        console.log('Error saving contact: ', error)
    }
}

async function updateContact(ctx){
    try {
        const id = ctx.params.contactId
        if(validateName(ctx.request.body.name)&&(validateName(ctx.request.body.lastname)
            &&validateEmail(ctx.request.body.email))){
        const updateContact = await Contact.findByIdAndUpdate(id, ctx.request.body)
        ctx.status = 200
        ctx.body = updateContact
            }
    } catch (error) {
        ctx.body = {
            error: 'Error, not a valid contact',
        }
        ctx.status = error.status || 400
        console.log('Error updating contact: ', error)
    }
}

async function deleteContact(ctx){
    try {
        const id = ctx.params.contactId
        const deleteContact = await Contact.findByIdAndRemove(id)
        ctx.status = 200
        ctx.body = deleteContact
    } catch (error) {
        ctx.body = {
            error: 'Error, no contact',
        }
        ctx.status = error.status || 400
        console.log('Error deleting contact: ', error)
    }
}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}