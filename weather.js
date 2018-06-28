import { map, pick, pipe } from 'ramda'
import { DARKSKY_SECRET_KEY } from './constants'
import axios from 'axios'

const getWeatherUrl = (obj) => {
  return `https://api.darksky.net/forecast/${DARKSKY_SECRET_KEY}/${obj.lat},${obj.lon}`
}

export default async function(objArr) {
  const requests = map(pipe(
    pick(['lat', 'lon']),
    getWeatherUrl,
    axios.get
  ), objArr)

  return Promise.all(requests)
}
