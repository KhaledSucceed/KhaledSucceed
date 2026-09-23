import { describe, expect, it } from 'vitest'
import { createDictionary, isCorrectWord, levenshtein, normalizeWord, suggest } from '../lib/spellChecker.js'

const words = ['algorithm', 'algebra', 'graph', 'tree', 'logic', 'binary', 'search', 'spell']
const dictionary = createDictionary(words)

describe('spell checker', () => {
  it('normalizes case', () => expect(normalizeWord('Algorithm')).toBe('algorithm'))
  it('removes punctuation', () => expect(normalizeWord('spell!')).toBe('spell'))
  it('accepts known word', () => expect(isCorrectWord('logic', dictionary)).toBe(true))
  it('rejects unknown word', () => expect(isCorrectWord('logik', dictionary)).toBe(false))
  it('distance is zero for equal words', () => expect(levenshtein('tree', 'tree')).toBe(0))
  it('computes replacement distance', () => expect(levenshtein('logik', 'logic')).toBe(1))
  it('computes insertion distance', () => expect(levenshtein('algoritm', 'algorithm')).toBe(1))
  it('ranks close suggestion first', () => expect(suggest('algoritm', words, 3)[0].word).toBe('algorithm'))
})