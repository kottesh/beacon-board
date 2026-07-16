# Changelog

## Unreleased

### Added
- `healthScore` percentage in `summarizeStatus` output (operational services / total).

## v0.3.0 - 2026-07-16

### Added
- Static web UI (`web/main.ts` + `public/index.html`) rendering the status board.
- `esbuild` bundling via `npm run build:web`.
- GitHub Pages deployment workflow (`deploy-pages.yml`).
- Incident summary helper (`src/incidents.ts`).

### Changed
- `build` now typechecks and bundles the web UI.
- Version bumped 0.2.0 -> 0.3.0.

### Fixed
- Reject empty service names in `summarizeStatus`.

## v0.2.0 - 2026-07-13

### Added
- Added detailed JSON report builder.
- Added service-level latency and note fields in reports.

## v0.1.0 - 2026-07-12

### Added
- Initial TypeScript status summary library.
- Basic CLI JSON output.
- Unit test for degraded service state.
