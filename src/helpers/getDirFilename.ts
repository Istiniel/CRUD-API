import path from 'path'
import { fileURLToPath } from 'node:url'

export default function getDirname(url: string): [string, string] {
  const filename = fileURLToPath(url)
  const dirname = path.dirname(__filename)

  return [dirname, filename]
}
