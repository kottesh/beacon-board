# Deployment

Beacon Board releases are created from tags.

## Preflight

```bash
npm test
npm run build
```

## Release

```bash
git tag v0.3.0
git push origin main --tags
```

## Smoke test

```bash
npm run dev
```

Confirm JSON output includes `overall`, `total`, `operational`, `degraded`, and `down`.

## Rollback

If a release fails, create a patch from the previous stable tag or republish artifacts from `v0.2.0`.
