# Subham Sourabh portfolio

Angular 21 standalone application with server rendering and prerendering.

## Run locally

Use Node 20.19+, 22.12+, or 24 and install the locked dependencies:

```sh
npm ci
npm start
```

Open http://localhost:4200. `npm run build` writes the production site to
`dist/my_portfolio`. `npm run serve:ssr:my_portfolio` serves the production build.

When deploying the SSR server, set `NG_ALLOWED_HOSTS` to a comma-separated list of
your actual hostnames (without schemes or ports). Angular 21 checks SSR request
hosts; localhost and loopback are allowed for local development.

## Architecture

- `app.component` owns the skip link, main landmark, router outlet, header and footer.
- The portfolio page is loaded through a route-level `loadComponent` import.
- Standalone hero, work, about, experience and contact components own their sections.
- `WorkComponent` owns filter state with `signal` and derives results with `computed`.
  `ProjectCardComponent` receives each project through a required signal input.
- Static resume content is kept in typed, readonly data files. Constants do not need
  signals because they do not change at runtime.
- All components use `OnPush`. Zoneless change detection is explicitly configured;
  neither the application nor the unit tests load Zone.js.
- About and experience use `@defer` with viewport/keyboard-interaction triggers and
  viewport hydration. Incremental hydration renders their complete content on the
  server, including in prerendered HTML, while deferring their JavaScript on the client.
  Persistent fragment targets preserve section navigation before hydration. Loading
  and error states support client-only rendering and failed chunk downloads.
- Shared visual styles and accessibility rules live in `src/styles/`.

## Validation

```sh
npm run test:ci
npm run build
npm run test:e2e
```

Unit tests use the zoneless scheduler and `whenStable()` rather than manually
forcing change detection after signal changes. Deferred success and error states
are tested explicitly.

The Playwright suite launches the production SSR server and uses installed Microsoft
Edge (`channel: 'msedge'`). It checks keyboard navigation, filters, disclosures,
PDF download, JavaScript-disabled content, 320px reflow, reduced motion, and axe
rules tagged for WCAG 2.2 AA. Install Edge or change the channel in
`playwright.config.ts` to your available Playwright browser.

For Karma on Windows with Edge, set `CHROME_BIN` before running the unit tests:

```powershell
$env:CHROME_BIN = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
npm run test:ci
```

Accessibility improvements include named sections, visible focus, a working skip
link, 44px interaction targets, higher text contrast, polite filter announcements,
unique disclosure names, new-tab notices, and reduced-motion/forced-color support.
Automated checks do not establish full WCAG conformance; manual screen-reader,
zoom/text-spacing, and cross-browser review remain part of release validation.
