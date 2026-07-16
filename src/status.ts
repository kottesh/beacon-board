export type ServiceState = 'operational' | 'degraded' | 'down'

export interface ServiceCheck {
  name: string
  state: ServiceState
  latencyMs?: number
  note?: string
}

export function summarizeStatus(checks: ServiceCheck[]) {
  if (checks.some((check) => check.name.trim().length === 0)) {
    throw new Error('Service name is required')
  }
  const down = checks.filter((check) => check.state === 'down')
  const degraded = checks.filter((check) => check.state === 'degraded')
  const overall: ServiceState = down.length > 0 ? 'down' : degraded.length > 0 ? 'degraded' : 'operational'

  const total = checks.length
  const operational = checks.filter((check) => check.state === 'operational').length
  const healthScore = total === 0 ? 100 : Math.round((operational / total) * 100)

  return {
    overall,
    total,
    operational,
    degraded: degraded.length,
    down: down.length,
    healthScore
  }
}
