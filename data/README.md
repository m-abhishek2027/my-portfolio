# Portfolio data

Content is stored as plain JSON, split two ways:

1. **Co-located with its component** — every section under
   [`/components`](../components) keeps its `.tsx` file(s) and its content
   JSON side by side in one folder:
   - [`components/Navbar/navbar.json`](../components/Navbar/navbar.json) — logo, nav links, resume button.
   - [`components/HeroBanner/hero.json`](../components/HeroBanner/hero.json) — name, tagline, stats, photo, socials.
   - [`components/About/about.json`](../components/About/about.json) — summary (Home preview) + full bio (`/about`).
   - [`components/Skills/skills.json`](../components/Skills/skills.json) — skill categories.
   - [`components/Projects/projects.json`](../components/Projects/projects.json) — one entry per project card.
   - [`components/Experience/experience.json`](../components/Experience/experience.json) — work history timeline.
   - [`components/Contact/contact.json`](../components/Contact/contact.json) — email, phone, socials.
   - [`components/Footer/footer.json`](../components/Footer/footer.json) — footer links, contact, socials.

   This is the pattern for every new component: give it its own folder, and
   put its JSON right next to it so the two are always edited and moved
   together. The shape of each file is typed with a small local `interface`
   declared at the top of that component's `.tsx` file — no separate types
   file to hunt down.

   About/Skills/Projects/Experience each accept a `variant` prop:
   `"preview"` (used on the Home page — shows a short/limited slice of the
   data plus a **View More** button) or `"full"` (used on that section's own
   page, e.g. `/projects` — shows everything). Contact doesn't need this
   since its content is already short enough to show in full everywhere.

2. **This top-level `/data` folder** — for content that isn't tied to any
   one component:

   | File          | Used for                                                   |
   | -------------- | ------------------------------------------------------------ |
   | `images.json` | Site images (gallery) not owned by a component.  |

   The Open Graph/Twitter preview image is **not** a JSON field — it's
   generated from code (`app/opengraph-image.tsx`, reused by
   `app/twitter-image.tsx`) using the real `AM` logo mark, so it can't drift
   out of sync with a manually-uploaded file. Same for the favicon/app icons
   (`app/icon.tsx`, `app/apple-icon.tsx`). See [`lib/seo.ts`](../lib/seo.ts)
   for the shared site name/description/keywords all of this (and every
   page's `metadata` export) is built from — update hero.json/contact.json
   and it flows through automatically.

## Adding images via Cloudinary

1. Upload the image in your Cloudinary media library.
2. Copy its **delivery URL** (looks like `https://res.cloudinary.com/<cloud-name>/image/upload/v.../file.jpg`).
3. Paste that URL into the right field — e.g. `photo.url` in `hero.json`, or
   the `image` field of a project in `projects.json`.
4. Always fill in the matching `alt` text — it's used for accessibility and SEO, not just decoration.

`next.config.ts` already allows images from `res.cloudinary.com` so `next/image` can optimize them.

Assets that are part of the design itself rather than editable content — like the
`AM` logo mark — live as plain files in [`/public`](../public) instead (e.g.
`public/logo.png`, referenced as `/logo.png` in `navbar.json` and `footer.json`).

## Editing checklist

- Keep the JSON valid (double quotes only, no trailing commas) — most editors will flag this for you.
- Don't rename the top-level fields (`id`, `label`, `href`, etc.) unless you also update the matching type/interface and the component that reads them.
- Empty string `""` means "not set yet" — components should treat it as optional/hidden until it's filled in.
