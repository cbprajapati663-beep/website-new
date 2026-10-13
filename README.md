# Heritage Auto Finance Website

A static, responsive website for Heritage Auto Finance.

## Project structure

```text
website-new/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── .github/
│   └── workflows/
│       └── pages.yml
└── README.md
```

## Separation of responsibilities

- **`index.html`** — semantic page structure, navigation, content, and forms.
- **`assets/css/styles.css`** — existing visual design, responsive breakpoints, layout, colours, and effects.
- **`assets/js/main.js`** — mobile navigation, EMI calculation, callback enquiry handling, and dynamic copyright year.
- **`.github/workflows/pages.yml`** — GitHub Pages deployment workflow.

## Local preview

Open `index.html` in a browser, or serve this folder with any static HTTP server. The site loads its fonts and icons from Google Fonts and Font Awesome CDN, and uses remote image URLs for the vehicle imagery.

## Enquiry behaviour

The callback form opens WhatsApp with the entered enquiry details. It does not submit to a backend or store the form data. The visitor must press **Send** inside WhatsApp to send the message.

## Deployment

GitHub Pages deployment is configured through the workflow in `.github/workflows/pages.yml`. Check the repository's **Actions** tab for the actual deployment result after a push.

## Maintenance notes

This refactor separates HTML, CSS, and JavaScript without intentionally changing the existing content, styling rules, calculator formula, or enquiry flow. This is a static marketing website; it does not currently define separate login or admin pages. No credentials, API keys, or secrets should be placed in client-side files.
