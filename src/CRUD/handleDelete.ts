import { type IncomingMessage, type ServerResponse } from 'node:http'
import { deleteUser, users } from '../store'

export async function handleDelete(req: IncomingMessage, res: ServerResponse): Promise<string> {
  const base = req.url?.split('/').slice(0, -1).join('/')
  const id = req.url?.split('/').at(-1)

  const uuidRegEx =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  if (uuidRegEx.test(id ?? '') && base === '/api/users') {
    const [user] = users.filter((user) => user.id === id)
    if (user !== undefined) {
      deleteUser(user.id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end('User is deleted!')
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
