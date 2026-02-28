# Variant-Inspired Web Dev Portfolio

Single-page, high-fidelity, interactive portfolio inspired by the Variant-style visual language.

## Stack
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- React Query + Axios (prewired)
- RHF + Zod (installed for v2 form work)
- Vitest (unit)
- Playwright (E2E)

## Run
```bash
pnpm install
pnpm dev
```

## Quality Gates
```bash
pnpm lint
pnpm test:unit
pnpm test:e2e
pnpm build
```

## What v1 Includes
- Black outer shell + rounded light panel
- Minimal top strip and side rail
- Canvas-based animated ASCII field
- Interactive desktop displacement lens (hover + drag)
- Simplified mobile mode (no drag lens)
- Static typed content model
- Links-only footer/contact

## Architecture Notes
- Canvas logic: `src/lib/canvas/asciiEngine.ts`
- Main interactive component: `src/components/canvas/AsciiDisplacementCanvas.tsx`
- Static content: `src/lib/content/siteContent.ts`
- Feature toggles: `src/config/features.ts`

## v2 Extension Path
- Add RHF + Zod contact form behind `features.futureContactForm`
- Wire Axios mutation through React Query
- Add project list/data source (CMS or local)
