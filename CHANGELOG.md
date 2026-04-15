# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed
- **CDN migration**: reveal.js core (`reset.css`, `reveal.css`, `reveal.js`), all standard plugins (markdown, highlight, math, notes, search, zoom), and reveal.js-menu now loaded from jsDelivr CDN (`reveal.js@5.1.0`, `reveal.js-menu@2.1.0`) instead of vendored local files
- **Build system simplified**: gulpfile now only compiles custom SCSS themes and copies images — no more JS bundling, plugin bundling, or reveal.js core compilation
- **Theme CSS not minified**: removed `gulp-clean-css` from the `css-themes` task so compiled theme CSS remains human-readable
- **Font Awesome and Academicons moved into fzj themes**: `fzj.scss` and `fzj-white.scss` now load these via `@import url()` from CDN directly, instead of from `index.html` — other themes are unaffected
- **Broken local font imports fixed**: stock themes (`beige`, `league`, `moon`, `solarized`, `black`, `white`, `black-contrast`, `white-contrast`) referenced missing local font files; replaced with Google Fonts CDN equivalents (`League Gothic`, `Source Sans Pro`)
- **Deprecated SASS fixed**: replaced `lighten()` with `color.scale()` in `fzj.scss` and `fzj-white.scss`; added missing `@use "sass:color"` to `fzj.scss`
- **Outdated gradient syntax fixed**: replaced vendor-prefixed `radial-gradient cover` syntax in `css/theme/template/mixins.scss` with modern `farthest-corner` equivalent
- **Fixed invalid `referrerpolicy`**: changed `no-anonymous` → `no-referrer` on Font Awesome CDN link in `index.html`

### Removed
- Devdependencies no longer needed: `@babel/core`, `@babel/eslint-parser`, `@babel/preset-env`, `@fortawesome/fontawesome-free`, `@rollup/plugin-babel`, `@rollup/plugin-commonjs`, `@rollup/plugin-node-resolve`, `@rollup/plugin-terser`, `babel-plugin-transform-html-import-to-string`, `colors`, `core-js`, `fitty`, `glob`, `gulp-eslint`, `gulp-header-comment`, `gulp-clean-css`, `highlight.js`, `marked`, `node-qunit-puppeteer`, `qunit`, `rollup`
- Vendored `dist/reveal.js`, `dist/reveal.esm.js`, `dist/reset.css`, `dist/reveal.css`, plugin JS/CSS bundles (now loaded from CDN)
- `js/` and `plugin/` source files are no longer compiled by the build

### Notes
- `dist/theme/*.css` (custom fzj themes) are still built locally via `npm run build`
- Offline support relies on browser caching CDN resources after first visit; the FZJ Weissenhof font requires internet regardless
