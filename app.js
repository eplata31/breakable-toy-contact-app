const koa = require('koa')
const router = require('./routes/routes')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const app = new koa()

app.use(koaBody())
app.use(bodyParser())
app.use(koaJson())
app.use(router.routes()).use(router.allowedMethods())

module.exports = app, router