const koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const contactCtrl = require('../controllers/contactController')
const app = new koa()

app.use(koaBody())
app.use(bodyParser())
app.use(koaJson())

const router = new Router()

router.get('/allContacts', contactCtrl.getAllContacts)
router.get('/contact/:contactId', contactCtrl.getContact)
router.post('/contact', contactCtrl.createContact)
router.put('/contact/:contactId', contactCtrl.updateContact)
router.delete('/contact/:contactId', contactCtrl.deleteContact)

module.exports = router
