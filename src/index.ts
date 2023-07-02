import http from 'node:http'
import doteenv from 'dotenv'
import { handleGet } from './CRUD/handleGet'
import { handlePost } from './CRUD/handlePost'
import { handlePut } from './CRUD/handlePut'
doteenv.config()

const PORT: number = Number(process.env.PORT) | 9000

const hostname = '127.0.0.1'

// function handlePut(): void {}
// function handleDelete(): void {}

const requestHandler = {
  GET: handleGet,
  POST: handlePost,
  PUT: handlePut,
  // DELETE: handleDelete,
}

const server = http.createServer((req, res) => {
  const method = req.method
  if (method != null && method in requestHandler) {
    const handler = requestHandler[method as keyof typeof requestHandler]
    void handler(req, res)
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        console.log('handle request successfull')
      })
  }
})

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`)
})
