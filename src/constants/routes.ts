// import { type IncomingMessage, type ServerResponse } from 'node:http'
// import { users } from '../store'
// import { type ResponseContent } from '../types'

// const getUsers = (req: IncomingMessage, res: ServerResponse): string => JSON.stringify(users)
// const getUser = (req: IncomingMessage, res: ServerResponse): string => {
//   const url = req.url?.split('/').at(-1)
//   return JSON.stringify(users[id])
// }

// export const routes: Record<string, ResponseContent> = {
//   '/': { response: () => 'Welcome traveller!', method: 'GET', status: 200 },
//   '/api/users': { response: getUsers, method: 'GET', status: 200 },
//   '/api/users/*': { response: getUser, method: 'GET', status: 200 },
// }
