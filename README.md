# StopSlop landing page

A static proof of concept for an AI consultancy. The brand name is provisional.

## Preview

Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000`.

The page also opens directly from `index.html`. It uses HTML, CSS, and browser JavaScript without a build step or dependencies. Google Fonts is optional; system fonts provide a fallback.

## Verify

Run the dependency-free checks with Node.js 24:

```sh
node --check script.js
node scripts/check-site.mjs
```

These checks validate JavaScript syntax, local HTML links and assets, fragment targets, and unique HTML IDs. Check browser behavior separately:

1. Open the page at desktop and mobile widths.
2. Follow each navigation link and expand an FAQ answer.
3. Select a priority, enter a challenge, and select **Create my brief**.
4. Confirm the brief contains the priority and challenge. Select **Copy brief** and paste it into a text editor.
5. Check keyboard focus and confirm the page has no horizontal overflow.

The brief stays in browser memory. The page sends no form data, stores no form data, and has no backend. Clipboard access requires browser permission; if unavailable, the page selects the text for manual copying.

## Deployment

Intended public URL: [kamilblaz.github.io/StopSlop](https://kamilblaz.github.io/StopSlop/).

GitHub Actions validates pull requests. Each push to `main` validates and deploys the site to GitHub Pages. You can also run the workflow manually on `main`.

The workflow publishes only `index.html`, `styles.css`, `script.js`, and `assets/`. Configure the repository's Pages source as **GitHub Actions**.

The deployed page remains a proof of concept. The brief runs locally in the visitor's browser; no backend receives it.
