import path from 'node:path'
// import getDirname from './getDirFilename'
import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'

export async function changeUsers(content: string): Promise<void> {
  // const [dirname] = getDirname(import.meta.url)
  const destinationPath = path.resolve('../store/users1.json')

  const readStream = Readable.from(content)
  const writeStream = fs.createWriteStream(destinationPath)
  await pipeline(readStream, writeStream)
}
