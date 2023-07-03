import { type IncomingMessage, type ServerResponse } from 'node:http'

export interface User {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export interface ResponseContent {
  response: (req: IncomingMessage, res: ServerResponse) => string
  method: string
  status: number
}
