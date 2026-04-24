import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

let cachedFontPromise: Promise<ArrayBuffer> | null = null

export async function loadOgFont(): Promise<ArrayBuffer> {
  if (cachedFontPromise) return cachedFontPromise

  const moduleDir = dirname(fileURLToPath(import.meta.url))
  const fontPath = join(moduleDir, '..', 'assets', 'LibreBaskerville-Regular.ttf')

  const promise = readFile(fontPath).then((buf) => {
    // Convert Buffer to ArrayBuffer so ImageResponse receives the correct type.
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  }).catch((err) => {
    cachedFontPromise = null
    throw err
  })

  cachedFontPromise = promise
  return promise
}
