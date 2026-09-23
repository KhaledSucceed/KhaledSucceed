import { useEffect, useMemo, useState } from 'react'
import { loadDictionaryBucket, loadDictionaryManifest } from './data/dictionary.js'
import { courseMatrix } from './data/courseMatrix.js'
import { buildTrie, fsmTrace, trieContains, turingCorrectionTrace } from './lib/algorithms.js'
import { isCorrectWord, normalizeWord, suggest } from './lib/spellChecker.js'

export default function App() {
  const [word, setWord] = useState('algoritm')
  const [dictionaryWords, setDictionaryWords] = useState([])
  const [manifest, setManifest] = useState({ total: 0, counts: {} })
  const [loading, setLoading] = useState(false)

  const normalized = normalizeWord(word)
  const firstLetter = normalized[0] ?? ''

  useEffect(() => {
    loadDictionaryManifest()
      .then(setManifest)
      .catch(() => setManifest({ total: 0, counts: {} }))
  }, [])

  useEffect(() => {
    let active = true
    if (!firstLetter) {
      setDictionaryWords([])
      return () => { active = false }
    }

    setLoading(true)
    loadDictionaryBucket(firstLetter)
      .then((words) => {
        if (active) setDictionaryWords(words)
      })
      .catch(() => {
        if (active) setDictionaryWords([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [firstLetter])

  const dictionary = useMemo(
    () => new Set(dictionaryWords),
    [dictionaryWords]
  )
  const trie = useMemo(
    () => buildTrie(dictionaryWords),
    [dictionaryWords]
  )

  const correct = isCorrectWord(normalized, dictionary)
  const suggestions = useMemo(
    () => correct ? [] : suggest(normalized, dictionaryWords, 5),
    [normalized, correct, dictionaryWords]
  )

  const best = suggestions[0]?.word ?? ''
  const fsm = useMemo(() => fsmTrace(word), [word])
  const turing = useMemo(
    () => best ? turingCorrectionTrace(normalized, best) : [],
    [normalized, best]
  )

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <span className="eyebrow">CSE315 · Discrete Mathematics</span>
          <h1>DiscreteSpell</h1>
          <p>Spell checking explained through sets, trees, edit distance, finite-state machines, and Turing-style traces.</p>
        </div>
        <div className="badge">Reimplementation · Evidence-first</div>
      </header>

      <section className="panel checker">
        <label htmlFor="word">Word to analyze</label>
        <div className="inputRow">
          <input id="word" value={word} onChange={(event) => setWord(event.target.value)} />
          <span className={correct ? 'status good' : 'status warn'}>
            {loading ? 'Loading dictionary…' : correct ? 'Dictionary match' : 'Needs correction'}
          </span>
        </div>

        <div className="metrics">
          <article><strong>{manifest.total.toLocaleString()}</strong><span>imported English words</span></article>
          <article><strong>{dictionaryWords.length.toLocaleString()}</strong><span>active letter bucket</span></article>
          <article><strong>{trieContains(trie, normalized) ? 'YES' : 'NO'}</strong><span>Trie membership</span></article>
          <article><strong>{fsm.at(-1)?.accepted ? 'ACCEPT' : 'REJECT'}</strong><span>FSM result</span></article>
        </div>

        <div className="suggestions">
          <h2>Suggestions</h2>
          {loading ? (
            <p className="muted">Loading the relevant dictionary bucket…</p>
          ) : suggestions.length === 0 ? (
            <p className="muted">No correction needed or no close candidate found.</p>
          ) : (
            <div className="chips">
              {suggestions.map((item) => (
                <button key={item.word} onClick={() => setWord(item.word)}>
                  {item.word} <small>d={item.distance}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid">
        <article className="panel">
          <h2>FSM trace</h2>
          <div className="trace">
            {fsm.map((step, index) => (
              <div key={index} className={step.accepted ? 'step' : 'step rejected'}>
                <b>{step.state}</b><span>{step.symbol}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Turing-style correction</h2>
          {turing.length === 0 ? <p className="muted">Choose or type a misspelled word.</p> : (
            <div className="tape">
              {turing.map((step) => (
                <div key={step.index} className="cell">
                  <span>{step.read} → {step.write}</span>
                  <small>{step.action}</small>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="panel">
        <h2>Discrete-mathematics course matrix</h2>
        <div className="matrix">
          {courseMatrix.map((item) => (
            <article key={item.id}>
              <b>{item.concept}</b>
              <span>{item.application}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}