import { describe, expect, it } from 'vitest'
import { courseMatrix } from '../data/courseMatrix.js'

describe('course matrix', () => {
  it('contains eight mapped concepts', () => expect(courseMatrix).toHaveLength(8))
  it('includes sets', () => expect(courseMatrix.some((x) => x.concept === 'Sets')).toBe(true))
  it('includes logic', () => expect(courseMatrix.some((x) => x.concept === 'Logic')).toBe(true))
  it('includes finite-state machines', () => expect(courseMatrix.some((x) => x.concept.includes('Finite-State'))).toBe(true))
  it('includes Turing machines', () => expect(courseMatrix.some((x) => x.concept.includes('Turing'))).toBe(true))
  it('includes graphs', () => expect(courseMatrix.some((x) => x.concept === 'Graphs')).toBe(true))
  it('includes trees', () => expect(courseMatrix.some((x) => x.concept === 'Trees')).toBe(true))
  it('maps every concept to an application', () => expect(courseMatrix.every((x) => x.application.length > 0)).toBe(true))
})