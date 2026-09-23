import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const words = require('an-array-of-english-words')

const outDir = path.resolve('public/dictionary')
await fs.mkdir(outDir, { recursive: true })

const buckets = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => [letter, new Set()])
)

for (const raw of words) {
  const word = String(raw).trim().toLowerCase()
  if (!/^[a-z]+$/.test(word)) continue
  buckets[word[0]].add(word)
}

let total = 0
const counts = {}

for (const [letter, values] of Object.entries(buckets)) {
  const list = [...values].sort()
  counts[letter] = list.length
  total += list.length
  await fs.writeFile(
    path.join(outDir, letter + '.json'),
    JSON.stringify(list),
    'utf8'
  )
}

await fs.writeFile(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ total, counts }, null, 2),
  'utf8'
)

console.log('Dictionary buckets generated:', total, 'words')