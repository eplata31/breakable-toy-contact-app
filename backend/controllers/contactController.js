const Contact = require('../models/contact')

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
        const name = ctx.params.contactId
        var filter = new RegExp(name, "i")
        const contact = await  Contact.find({ $or:[{'name':filter}, {'lastname':filter} ]}, 'name lastname')
        ctx.body = contact
    } catch (error) {
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
            error: 'Error, not valid contact',
            newContact
        }
        ctx.status = error.status || 400
        console.log('Error saving contact: ', error)
    }
}

async function updateContact(ctx){
    try {
        const id = ctx.params.contactId
        const updateContact = await Contact.findByIdAndUpdate(id, ctx.request.body)
        ctx.body = updateContact
    } catch (error) {
        console.log('Error updating contact: ', error)
    }
}

async function deleteContact(ctx){
    try {
        const id = ctx.params.contactId
        const deleteContact = await Contact.findByIdAndRemove(id)
        ctx.body = deleteContact
    } catch (error) {
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