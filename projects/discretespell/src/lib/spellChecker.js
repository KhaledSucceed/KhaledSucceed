export function normalizeWord(word) {
  return String(word ?? '').trim().toLowerCase().replace(/[^a-z]/g, '')
}

export function createDictionary(words) {
  return new Set(words.map(normalizeWord).filter(Boolean))
}

export function isCorrectWord(word, dictionary) {
  const normalized = normalizeWord(word)
  return normalized.length > 0 && dictionary.has(normalized)
}

export function levenshtein(a, b) {
  const left = normalizeWord(a)
  const right = normalizeWord(b)
  const rows = left.length + 1
  const cols = right.length + 1
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }
  return matrix[left.length][right.length]
}

export function suggest(word, dictionaryWords, limit = 5) {
  const normalized = normalizeWord(word)
  if (!normalized) return []

  const first = normalized[0]
  const candidates = dictionaryWords.filter((candidate) => {
    const clean = normalizeWord(candidate)
    return clean &&
      clean[0] === first &&
      Math.abs(clean.length - normalized.length) <= 2
  })

  return candidates
    .map((candidate) => ({
      word: normalizeWord(candidate),
      distance: levenshtein(normalized, candidate)
    }))
    .filter((item) => item.distance <= 2)
    .sort((a, b) => a.distance - b.distance || a.word.localeCompare(b.word))
    .filter((item, index, array) =>
      index === array.findIndex((other) => other.word === item.word)
    )
    .slice(0, limit)
}