import { summarizeStatus, type ServiceCheck } from '../src/status.js'
import { incidentSummary } from '../src/incidents.js'

const checks: ServiceCheck[] = [
  { name: 'api', state: 'operational', latencyMs: 84 },
  { name: 'worker', state: 'operational', latencyMs: 130 },
  { name: 'docs', state: 'degraded', latencyMs: 420, note: 'slow static asset response' }
]

const summary = summarizeStatus(checks)
const incident = incidentSummary(checks)

const stateColor: Record<string, string> = {
  operational: '#2ea043',
  degraded: '#d29922',
  down: '#f85149'
}

function render(): string {
  const rows = checks
    .map(
      (c) => `
      <tr>
        <td>${c.name}</td>
        <td><span class="dot" style="background:${stateColor[c.state]}"></span>${c.state}</td>
        <td>${c.latencyMs ?? '—'} ms</td>
        <td>${c.note ?? ''}</td>
      </tr>`
    )
    .join('')

  return `
  <header>
    <h1>Beacon Board</h1>
    <p class="overall" style="color:${stateColor[summary.overall]}">
      ${summary.overall.toUpperCase()}
    </p>
  </header>
  <p class="incident">${incident.message}</p>
  <table>
    <thead><tr><th>Service</th><th>State</th><th>Latency</th><th>Note</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <footer>${summary.operational}/${summary.total} operational · generated ${new Date().toISOString()}</footer>`
}

const app = document.getElementById('app')
if (app) app.innerHTML = render()
