import { type IncomingMessage, type ServerResponse } from 'node:http'
import { users } from '../store'

export async function handleGet(req: IncomingMessage, res: ServerResponse): Promise<string> {
  const url = req.url
  const base = req.url?.split('/').slice(0, -1).join('/')
  const id = req.url?.split('/').at(-1)

  const uuidRegEx =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  if (url === '/api/users') {
    const currentUsers = JSON.stringify(users)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(currentUsers)
    res.end()
  } else if (uuidRegEx.test(id ?? '') && base === '/api/users') {
    const [user] = users.filter((user) => user.id === id)
    if (user !== undefined) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(user))
      res.end()
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write('Such a user does not exist')
      res.end()
    }
  } else if (!uuidRegEx.test(id ?? '') && base === '/api/users') {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.write('Error! ID should be presented in uuid v4 format')
    res.end()
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('Error! Non-existing route')
    res.end()
  }

  return 'Request handled'
}
