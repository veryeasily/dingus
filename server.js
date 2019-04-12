import { addIndex, map, merge, pick, pipe, zip } from 'ramda'
import axios from 'axios'
const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const people = ['Tim', 'Timbo', 'The Gun', 'Dorsey', 'DorDor', 'The Dor', 'max', 'Maxwell', 'Max', 'Maxwell Murder', 'Tambo', 'Lydia', 'LYDIA', 'Gibbers', 'LYDIA MF GIBSON', 'Matt', 'Splatt', 'Swanson', 'Matthew The Swan`s Son', 'Sam', 'Slambo', 'Slammy', 'Ham Sartman', 'Wayne', 'wayne', 'Wayner', 'Waynedawg', 'Luke', 'Lucas', 'the4thoffense','khaos', 'Brent', 'BCROUCH', 'Brento', 'Pookus', 'Lukewarm', 'Thunderwood', 'iLukeU!!', '@Zo', 'Lil Bit', 'Freya', 'Ian', 'I A N', 'Kent', 'Kenny', 'Kenbo', 'Butt', 'Nick', 'Nickles', 'Big Poppa P', 'Packy', 'The Tired', 'Tacos', 'Possum Blood', 'Cheese']


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
      return `${i.name}: ${i.hourly.summary} ${i.currently.temperature}F°`
    }, cleanedData)
    const temp = await axios.post(GROUPME_API_PATH, {
      bot_id: BOT_ID,
      text: summaries.join('\n\n')
    })
    ctx.body = 'Hello World'
  } else if(text.match(/@dingus\s*(who.?s better|who is better|who.?s danker|who is danker|who.?s best|who is best|who.?s dankest|who is dankest)/)) {
    const rand = Math.random()
    if (rand >= 0.99){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick is master of the known world"
      })
    } else if (rand >=0.98){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick reigns supreme"
      })
    } else if (rand >=0.93){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Nick is superior to Tim"
      })
    } else if (rand >=0.915){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "This time it is Sam"
      })
    } else if (rand >=0.9){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Wayne wins this round"
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
    } else if (0.03 <= rand && rand <0.1){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is superior to Nick"
      })
    } else if (rand >= .01){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is the new god of this land"
      })
    } else if (rand <0.01){
      axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: "Tim is better than Tim"
      })
    }
  } else if(text.match(/@dingus\s*(who wins|who triumphs|who succeeds|who is a dingus|who is a dweeb|who is king dingus|who da best|whom is winst|who winner is|who reigns supreme|who is president|who is ultimate|who is the dankest|who is the most dank)/)) {
    const person = people[Math.floor(Math.random() * people.length)]
    axios.post(GROUPME_API_PATH, {
        bot_id: BOT_ID,
        text: person + " is best!"
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
