import { summarizeStatus, type ServiceCheck } from './status.js'

export function buildReport(checks: ServiceCheck[]) {
  return {
    generatedAt: new Date().toISOString(),
    summary: summarizeStatus(checks),
    services: checks.map((check) => ({
      name: check.name,
      state: check.state,
      latencyMs: check.latencyMs ?? null,
      note: check.note ?? null
    }))
  }
}
