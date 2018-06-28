const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async ctx => {
  console.log(ctx.request.body.text)
  ctx.body = 'Hello World'
})

app.listen(3000)
