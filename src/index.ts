import { summarizeStatus, type ServiceCheck } from './status.js'

const checks: ServiceCheck[] = [
  { name: 'api', state: 'operational', latencyMs: 84 },
  { name: 'worker', state: 'operational', latencyMs: 130 },
  { name: 'docs', state: 'degraded', latencyMs: 420, note: 'slow static asset response' }
]

console.log(JSON.stringify(summarizeStatus(checks), null, 2))
