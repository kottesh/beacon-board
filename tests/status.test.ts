import { describe, expect, it } from 'vitest'
import { summarizeStatus } from '../src/status.js'

describe('summarizeStatus', () => {
  it('marks board degraded when any service is degraded', () => {
    const result = summarizeStatus([
      { name: 'api', state: 'operational' },
      { name: 'docs', state: 'degraded' }
    ])

    expect(result.overall).toBe('degraded')
  })

  it('marks board down when any service is down', () => {
    const result = summarizeStatus([
      { name: 'api', state: 'operational' },
      { name: 'worker', state: 'down' }
    ])

    expect(result.overall).toBe('down')
  })

  it('computes a health score from operational services', () => {
    const result = summarizeStatus([
      { name: 'api', state: 'operational' },
      { name: 'worker', state: 'operational' },
      { name: 'docs', state: 'degraded' },
      { name: 'cdn', state: 'down' }
    ])

    expect(result.healthScore).toBe(50)
  })
})
