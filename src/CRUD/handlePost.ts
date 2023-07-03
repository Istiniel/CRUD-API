import { type IncomingMessage, type ServerResponse } from 'node:http'
import { getRequestBody } from '../helpers/getResponseBody'
import { type User } from '../types'
import { v4 } from 'uuid'
import { users } from '../store'

export async function handlePost(req: IncomingMessage, res: ServerResponse): Promise<string> {
  const url = req.url

  if (url === '/api/users') {
    try {
      const load = await getRequestBody(req)
      const user: Partial<User> = JSON.parse(load)
      const newId = v4()
      user.id = newId

      if ('username' in user && 'age' in user && 'hobbies' in user) {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        users.push(user as User)
        res.write(JSON.stringify(user))
        res.end()
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('User does not contain all the necessary fields')
        res.end()
      }
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('Error! Something got wrong...')
      res.end()
    }
  }

  return 'Request handled'
}
