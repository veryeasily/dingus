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
  } else if(text.match(/@dingus\s*who's better/)) {
    const rand = Math.random()
    if (rand >= 0.90){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick is superior to Tim"
      })
    } else if (0.75 < rand && rand <0.9){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick is vastly better than Tim"
      })
    } else if (0.45 <= rand && rand <=0.75){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick is  better than Tim"
      })
    } else if (0.40 <= rand && rand <0.45){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Stalemate"
      })
    } else if (0.2 <= rand && rand <0.4){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is better than Nick"
      })
    } else if (0.1 <= rand && rand <0.2){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is vastly better than Nick"
      })
    } else if (0.01 <= rand && rand <0.1){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is superior to Nick"
      })
    } else if (rand <0.01){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is better than Tim"
      })
    } else {
      const msg = text.match(/@dingus\s(.*)/i)[1]
      const resp = await axios.get(
        `http://txtingus:5000/${encodeURIComponent(msg)}`
      )
      const temp2 = await axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: resp.data
      })
      ctx.body = 'Hello World'
    }
  })

app.listen(3000)
