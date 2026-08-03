# Nurses Inc.

A premium, interactive web application for **Nurses Inc.**, an independent collaborative nursing practice in New Brunswick specializing in Geriatrics, Dementia, and Late-Life Mental Health.

Built with **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**.

## Features

- **4 pages**: Home, Services & Pricing, Knowledge Hub, Contact
- **Interactive 3D-tilt cards**, mouse-track highlights, blob morphing, page transitions
- **12-service B2C/B2B pricing board** with animated flip cards
- **3-pathway Knowledge Hub** with morphing color themes
- **10 standalone printable forms** (Medication Audit Bundle) — each fits on one page
- **3 one-pagers** (Dementia Insights, Late-Life Mental Health, Geriatric Wellness)
- **PHIPAA-aligned** compliance notice on every page
- **Mobile-first responsive** with full keyboard accessibility and `prefers-reduced-motion` support
- **100% client-side** — no backend required

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production bundle in dist/
npm run preview      # preview the production build
```

## Deploy for free (in 5 minutes)

The fastest paths to share this site with anyone:

| Platform | How |
|---|---|
| **Vercel** | Push to GitHub → import repo at [vercel.com/new](https://vercel.com/new) → auto-deploys |
| **Netlify** | Push to GitHub → import at [app.netlify.com](https://app.netlify.com) → auto-deploys |
| **Cloudflare Pages** | Push to GitHub → connect at [pages.cloudflare.com](https://pages.cloudflare.com) → auto-deploys |
| **Drag-and-drop** | `npm run build` → drag the `dist/` folder onto Netlify or Vercel |

All three give you a free `*.vercel.app` / `*.netlify.app` / `*.pages.dev` URL with HTTPS.

### Custom domain

Once deployed, any of the three platforms lets you attach a custom domain (e.g. `nursesinc.ca`) for free. You only pay the registrar — Cloudflare Registrar and Porkbun both sell `.ca` for ~$10–15/year.

## Project structure

```
src/
├── main.tsx, App.tsx, index.css
├── nurses-inc-config.ts        # brand, services, team, knowledge paths
├── resources-config.ts         # resource cards (3)
├── med-form-forms.ts           # 10 standalone medication-audit forms
├── onepagers-config.ts         # 3 knowledge-hub one-pagers
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── generators.ts           # standard PDF + DOCX generators
│   ├── med-form-pdf.ts         # 10 single-page form PDFs
│   └── onepager-pdf.ts         # 3 one-pager PDFs
└── components/
    ├── Nav, Footer, PhipeaBadge
    ├── Section, SectionDivider
    ├── MouseCard               # 3D tilt + cursor highlight
    ├── Hero                    # morphing SVG shapes that track cursor
    ├── MeetTeam, ServicesTeaser
    ├── ServicesBoard           # B2C/B2B tabs + 12 flip cards
    ├── KnowledgeExplorer       # 3 pathways with morph theme
    ├── KnowledgeOnePagerButton # one-pager download triggers
    ├── ContactForm             # custom form + animated checkmark
    ├── ResourcesBoard          # info + bundle modals
    └── MedFormsBoard           # 10-form grid inside bundle modal
```

## Editing copy & prices

All brand, service, team, and resource content lives in:

- `src/nurses-inc-config.ts` — brand, services, team bios, knowledge paths
- `src/resources-config.ts` — 3 resource cards
- `src/med-form-forms.ts` — 10 medication-audit form payloads
- `src/onepagers-config.ts` — 3 knowledge-hub one-pagers

You can change rates, names, descriptions, and references without touching layout code.

## License

© Nurses Inc. All rights reserved.