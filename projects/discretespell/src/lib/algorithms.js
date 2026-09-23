export function buildTrie(words) {
  const root = { terminal: false, children: {} }
  for (const raw of words) {
    const word = String(raw).toLowerCase()
    let node = root
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = { terminal: false, children: {} }
      }
      node = node.children[char]
    }
    node.terminal = true
  }
  return root
}

export function trieContains(root, rawWord) {
  const word = String(rawWord).toLowerCase()
  let node = root
  for (const char of word) {
    if (!node.children[char]) return false
    node = node.children[char]
  }
  return Boolean(node.terminal)
}

export function fsmTrace(rawWord) {
  const word = String(rawWord)
  const trace = [{ state: 'q0', symbol: 'ε', accepted: true }]

  for (let index = 0; index < word.length; index += 1) {
    const symbol = word[index]
    const accepted = /^[A-Za-z]$/.test(symbol)
    trace.push({
      state: accepted ? 'qLetter' : 'qReject',
      symbol,
      accepted
    })
    if (!accepted) break
  }

  const accepted = word.length > 0 && trace.every((step) => step.accepted)
  trace.push({ state: accepted ? 'qAccept' : 'qReject', symbol: '□', accepted })
  return trace
}

export function turingCorrectionTrace(input, suggestion) {
  const source = String(input).toLowerCase()
  const target = String(suggestion).toLowerCase()
  const steps = []
  const max = Math.max(source.length, target.length)

  for (let index = 0; index < max; index += 1) {
    const from = source[index] ?? '□'
    const to = target[index] ?? '□'
    steps.push({
      index,
      read: from,
      write: to,
      action: from === to ? 'KEEP' : from === '□' ? 'INSERT' : to === '□' ? 'DELETE' : 'REPLACE'
    })
  }
  return steps
}