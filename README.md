# Togosmaa Baatar — Portfolio

Bilingual Mongolian / English portfolio for small-business websites, business tools, digital promotion and development.

## Preview and build

Run `python3 -m http.server 8088 --bind 127.0.0.1`, then open http://127.0.0.1:8088. Build with `sh scripts/build.sh`; Vercel serves `dist/` with no dependencies.

## Verified work through October 10, 2026

- Tsagaan Garid: bilingual travel website, https://tsagaan-garid.vercel.app
- MNG Construction: concept company showcase, https://hicheel-1.vercel.app
- MNG Expense Ledger: private business app, https://mng-construction-expenses.vercel.app
- Canada Joloo: independent Alberta Class 7 learning app, https://canada-joloo.vercel.app

Organization lesson repositories are excluded because access to a course template does not establish authorship. No invented customers, testimonials or business results. Project descriptions were verified against local and GitHub READMEs. Private ledger screenshots and data are not published. App previews for the ledger and driving app are CSS illustrations.

The contact form downloads a local text brief; it does not send messages or retain contact information. A real contact email or phone is needed to enable direct inquiries. Language preference is the only localStorage item.

## Portrait

`assets/portrait.png` was edited using the built-in image generation tool, preserving the supplied portrait's identity and glasses. Final prompt: “Preserve recognizable facial identity, proportions, age, black eyeglasses, natural skin texture and hair color. Professional charcoal blazer and ivory blouse, subtle jewelry, neutral warm gray studio background, soft daylight, approachable expression. Remove sticker and home background. No text or watermarks.” Original supplied image is preserved.

## Editing

Update both `data-mn` and `data-en` attributes in `index.html`; edit case-study copy in `script.js`. `projects.json` is a reference inventory, not loaded at runtime. Only built website assets are deployed; original photograph and developer notes are excluded from `dist/`.
