# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed
- **CDN migration**: reveal.js core, all standard plugins, and reveal.js-menu now loaded from jsDelivr CDN instead of vendored local files
- **Build system simplified**: gulpfile now only compiles custom SCSS themes and copies images — no more JS bundling, plugin bundling, or reveal.js core compilation
- **package.json**: removed 14 devDependencies no longer needed (Babel, Rollup, ESLint, QUnit, highlight.js, marked, etc.)
- **fzj-white.scss / fzj.scss**: removed redundant local Font Awesome and Academicons imports (both already loaded via CDN in index.html)
- Fixed invalid `referrerpolicy="no-anonymous"` attribute on Font Awesome CDN link (changed to `no-referrer`)

### Notes
- `dist/theme/fzj-white.css` and other custom themes are still built locally via `npm run build`
- Offline support relies on browser caching CDN resources after first visit (FZJ font requires internet regardless)
