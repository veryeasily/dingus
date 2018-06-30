import { addIndex, map, merge, pick, pipe, zip } from 'ramda'
import axios from 'axios'
const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')

axios.defaults.headers.post['Content-Type'] = 'application/json'

import weather from './weather'
import { BOT_ID, GROUPME_API_PATH, LOCATIONS } from './constants'

app.use(bodyParser())

app.use(async (ctx, next) => {
  if (!(typeof ctx.request.body === 'object')) { return; }
  if (ctx.request.body.sender_type === 'bot') { return; }
  if (!ctx.request.body.text.match(/@dingus /)) { return; }
  next()
})

app.use(async ctx => {
  const text = ctx.request.body.text
  if (text.match(/@dingus\s.*weather/i)) {
    const data = await weather(LOCATIONS)
    const cleanedData = map(i => (
      merge(i[0].data, pick(['name'])(i[1]))
    ), zip(data, LOCATIONS))
    const summaries = map(i => {
      return `${i.name}: ${i.hourly.summary}`
    }, cleanedData)
    const temp = await axios.post(GROUPME_API_PATH, {
      bot_id: BOT_ID,
      text: summaries.join('\n\n')
    })
    ctx.body = 'Hello World'
  } else {
    const msg = text.match(/@dingus\s(.*)/i)[1]
    const resp = await axios.get(`http://txtingus:5000/{msg}`)
    const temp2 = await axios.post(GROUPME_API_PATH, {
      bot_id: BOT_ID,
      text: resp.data
    })
    ctx.body = 'Hello World'
  }
})

app.listen(3000)
