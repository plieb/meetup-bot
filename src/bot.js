import recastai from 'recastai'
import { replyMessage } from './messages'

// Instantiate Recast.AI SDK
const client = new recastai(process.env.REQUEST_TOKEN)

export const bot = (body, response, callback) => {
  if (body.message) {
    client.connect.handleMessage({ body }, response, replyMessage)
    callback(null, { result: 'Bot answered :)' })
  } else {
    callback('No text provided')
  }
}
