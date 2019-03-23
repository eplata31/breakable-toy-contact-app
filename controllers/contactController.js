const Contact = require('../models/contact')

async function getAllContacts(ctx) {
    const contacts = await Contact.find({})
    ctx.body = contacts
}

async function getContact(ctx) {
    const name = ctx.params.contactId
    var filter = new RegExp(name, "i")
    const contact = await Contact.find({ $or: [{ 'name': filter }, { 'lastname': filter }] }, 'name lastname')
    ctx.body = contact
}

async function createContact(ctx) {
    const newContact = ctx.request.body
    let contact = new Contact(newContact)
    const savedContact = await contact.save()
    console.log('Contact saved!')
    ctx.body = savedContact
}

async function updateContact(ctx) {
    const id = ctx.params.contactId
    const updateContact = await Contact.findByIdAndUpdate(id, ctx.request.body)
    ctx.body = updateContact
}

async function deleteContact(ctx) {
    const id = ctx.params.contactId
    const deleteContact = await Contact.findByIdAndRemove(id)
    ctx.body = deleteContact
}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}