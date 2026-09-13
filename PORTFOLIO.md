# Portfolio

A responsive Angular portfolio with project category filters, expandable project descriptions, and email contact links.

## Personalize

- Edit `src/app/app.component.ts` to replace the sample name, email, and projects.
- Edit `src/app/app.component.html` for your biography, skills, availability, and initials.
- Edit `src/index.html` for your page title and description.
- Adjust colors and layout in `src/styles.scss`.

All three projects are sample concepts. Replace them with your real work before publishing. The contact links open the visitor's email application; there is no backend contact form.

## Run

With Node.js and npm installed:

```sh
npm install
npm start
```

Open http://localhost:4200.

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

The production output is written to `dist/my_portfolio`.
