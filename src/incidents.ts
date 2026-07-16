import type { ServiceCheck } from './status.js'

export function incidentSummary(checks: ServiceCheck[]) {
  const affected = checks.filter((check) => check.state !== 'operational')
  return {
    hasIncident: affected.length > 0,
    affectedServices: affected.map((check) => check.name),
    message: affected.length === 0
      ? 'All services operational.'
      : `${affected.length} station${affected.length === 1 ? '' : 's'} ${affected.length === 1 ? 'needs' : 'need'} attention: ${affected.map((check) => check.name).join(', ')}`
  }
}
