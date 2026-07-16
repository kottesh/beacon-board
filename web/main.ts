import { summarizeStatus, type ServiceCheck } from '../src/status.js'
import { incidentSummary } from '../src/incidents.js'

const checks: ServiceCheck[] = [
  { name: 'api', state: 'operational', latencyMs: 84 },
  { name: 'worker', state: 'operational', latencyMs: 130 },
  { name: 'docs', state: 'degraded', latencyMs: 420, note: 'slow static asset response' }
]

const summary = summarizeStatus(checks)
const incident = incidentSummary(checks)

type State = ServiceCheck['state']

const verdict: Record<State, { label: string; line: string }> = {
  operational: { label: 'ALL CLEAR', line: 'The watch is steady. Every station is answering.' },
  degraded: { label: 'CAUTION', line: 'Signal is holding, but a station needs attention.' },
  down: { label: 'ALARM', line: 'A station has gone dark. Respond now.' }
}

// latency ceiling used to scale the signal bars
const maxLatency = Math.max(200, ...checks.map((c) => c.latencyMs ?? 0))

function stationRow(c: ServiceCheck): string {
  const pct = Math.min(100, Math.round(((c.latencyMs ?? 0) / maxLatency) * 100))
  const lat = c.latencyMs != null ? `${c.latencyMs}` : '—'
  return `
    <li class="station station--${c.state}">
      <span class="station__beacon" aria-hidden="true"></span>
      <span class="station__name">${c.name}</span>
      <span class="station__state">${c.state}</span>
      <span class="station__signal" aria-hidden="true">
        <span class="station__signal-fill" style="width:${pct}%"></span>
      </span>
      <span class="station__latency"><b>${lat}</b> ms</span>
      <span class="station__note">${c.note ?? ''}</span>
    </li>`
}

function render(): string {
  const v = verdict[summary.overall]
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'

  return `
    <main class="deck" data-state="${summary.overall}">
      <section class="hero" aria-label="Overall status">
        <div class="lamp" aria-hidden="true">
          <div class="lamp__sweep"></div>
          <div class="lamp__core"></div>
        </div>
        <p class="eyebrow">Beacon Board — station watch</p>
        <h1 class="verdict">${v.label}</h1>
        <p class="verdict__line">${v.line}</p>
        <p class="tally">
          <b>${summary.operational}</b> clear
          <span>·</span> <b>${summary.degraded}</b> caution
          <span>·</span> <b>${summary.down}</b> dark
          <span>·</span> ${summary.total} stations
        </p>
      </section>

      <section class="log" aria-label="Station log">
        <div class="log__head">
          <span>Station</span><span>State</span><span>Signal</span><span>Latency</span><span>Note</span>
        </div>
        <ul class="log__list">
          ${checks.map(stationRow).join('')}
        </ul>
      </section>

      <footer class="readout">
        <span class="readout__mark">◐</span>
        <span>${incident.message}</span>
        <span class="readout__stamp">${stamp}</span>
      </footer>
    </main>`
}

const app = document.getElementById('app')
if (app) app.innerHTML = render()
