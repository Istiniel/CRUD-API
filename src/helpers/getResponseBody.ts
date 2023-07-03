import { type IncomingMessage } from 'node:http'

export async function getRequestBody(req: IncomingMessage): Promise<string> {
  return await new Promise((resolve, reject) => {
    let result = ''

    try {
      req.on('data', (data: string) => {
        result += data
      })

      req.on('end', () => {
        resolve(result)
      })
    } catch (error) {
      reject(error)
    }
  })
}
