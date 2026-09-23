export async function loadDictionaryManifest() {
  const response = await fetch('/dictionary/manifest.json')
  if (!response.ok) throw new Error('Could not load dictionary manifest')
  return response.json()
}

export async function loadDictionaryBucket(letter) {
  const normalized = String(letter ?? '').toLowerCase()
  if (!/^[a-z]$/.test(normalized)) return []

  const response = await fetch('/dictionary/' + normalized + '.json')
  if (!response.ok) throw new Error('Could not load dictionary bucket')
  return response.json()
}