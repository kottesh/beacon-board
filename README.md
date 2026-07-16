# Beacon Board

Beacon Board is a tiny TypeScript status board for solo projects. The core library
summarizes service health checks, and a small static web UI renders them. It deploys
to **GitHub Pages**.

## Commands

```bash
npm install
npm test          # unit tests
npm run build     # typecheck (tsc) + bundle web UI (esbuild) -> public/main.js
npm run dev       # run the CLI summary locally
```

## Live site

Deployed via GitHub Pages on tag push or manual dispatch of the **Deploy Pages** workflow.

## Release flow

1. Bump version + update CHANGELOG.
2. Publish a GitHub Release for the new tag (auto-creates the tag).
3. The tag push triggers **Deploy Pages**, which builds and deploys the site.
