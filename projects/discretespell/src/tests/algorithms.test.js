import { describe, expect, it } from 'vitest'
import { buildTrie, fsmTrace, trieContains, turingCorrectionTrace } from '../lib/algorithms.js'

const trie = buildTrie(['graph', 'tree', 'logic'])

describe('discrete algorithms', () => {
  it('builds trie membership', () => expect(trieContains(trie, 'graph')).toBe(true))
  it('rejects absent trie word', () => expect(trieContains(trie, 'graphs')).toBe(false))
  it('is case-insensitive in trie', () => expect(trieContains(trie, 'TREE')).toBe(true))
  it('FSM accepts letters', () => expect(fsmTrace('logic').at(-1).accepted).toBe(true))
  it('FSM rejects digits', () => expect(fsmTrace('logic2').at(-1).accepted).toBe(false))
  it('FSM rejects punctuation', () => expect(fsmTrace('spell!').at(-1).accepted).toBe(false))
  it('Turing trace records replacement', () => expect(turingCorrectionTrace('logik', 'logic').at(-1).action).toBe('REPLACE'))
  it('Turing trace preserves matching cells', () => expect(turingCorrectionTrace('tree', 'tree').every((step) => step.action === 'KEEP')).toBe(true))
})