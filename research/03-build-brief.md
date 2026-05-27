# Kincan Water Solution. Website Build Brief

**Client:** Kincan Water Solution (Kincan LLC), Hattiesburg, MS
**Date:** 2026-05-25
**Current site score:** 49 / 80
**Build target:** 72+ / 80 (Adcock-class)

---

## 1. Design Direction

### Palette

| Token | Hex | Use |
|---|---|---|
| `--cyan` (Primary) | `#0E7DAB` | Brand color. CTAs. Section accents. Link color on light. |
| `--cyan-deep` | `#075F87` | Hover, gradient depth. |
| `--midnight` | `#0B1F2A` | Dark sections, footer. Pool-at-night anchor. |
| `--red` (Accent) | `#C8442C` | Heritage accent. Badge highlight. Secondary CTA outline. |
| `--sand` | `#F2EBDC` | Warm card surface. Soft section divider. |
| `--paper` | `#FAF7F1` | Primary background. |
| `--ink` | `#0A0F14` | Body text. |
| `--slate` | `#3A4853` | Muted body. |
| `--hairline` | `#E2DCCF` | Dividers. |

**Rationale:** Three of five top competitors use a water blue. Cyan + sunset red + warm paper differentiates Kincan from Adcock's teal, Premier's navy, ASP's red-corporate, and Outdoor Living's sage. The heritage red carries the existing logo forward without dominating.

### Typography

- **Headings:** Fraunces (700/600), via Google Fonts. Confident, warm serif. Tracks tight on display sizes.
- **Body:** Inter (400/500/600), via Google Fonts. Clean, dense, screen-optimized.
- **Numerals:** Tabular for stat counters.

### Photography style

- Lead with Kincan's actual portfolio. Red-umbrella pool, five before-and-afters, water feature, in-ground hot tub.
- No stock photography on the homepage.
- All images self-hosted in `site/assets/portfolio/`.

### Animation recommendations

- **GSAP + ScrollTrigger** for scroll choreography.
- **Hero:** reserved slot for a scroll-driven 3D pool asset (placeholder marked).
- **Section reveals:** fade-up on viewport entry, 600ms ease-out, staggered by index.
- **Service cards:** subtle lift + cyan border glow on hover.
- **Geography map:** SVG drawn-in lines, town pins fade-in sequentially as the section scrolls.
- **Stats:** count-up on the "40+", "$450", "15" numbers. Years are static (no "2,010" artifacts).
- **Before/after slider:** drag-handle reveals the "after" image, smooth GSAP tween.
- `prefers-reduced-motion` honored across the board.

### What to avoid

1. Em-dashes in user-facing copy. Run grep before commit.
2. Stock photography.
3. Three competing CTAs. Pick one.
4. Hidden phone number.
5. Generic franchise voice ("we deliver excellence").
6. Inverting the logo onto dark. Use the existing PNG on light surfaces only; on dark, use a wordmark text-treatment in place of the logo.

---

## 2. Site Architecture

### Page list (Phase 1 build)

1. **Home** (`index.html`) — single-page hero plus all sections.
2. **Competitive Analysis Report** (`competitive-analysis.html`, already built, `noindex`) — client-only sales tool.

### Single-page strategy

For a Pine Belt local-services business with 15 service areas and one phone CTA, a long, well-paced single-page site converts better than a multi-page site. Local searchers scroll. They don't navigate.

**Anchor navigation:** Home / Services / Portfolio / Areas / Reviews / About / Contact

### Section sequence on the homepage

| # | Section | Purpose |
|---|---|---|
| 1 | Sticky nav | Logo, anchor links, persistent phone CTA |
| 2 | Hero | "40+ years building Pine Belt pools." Single CTA. 3D placeholder. |
| 3 | Stats strip | 40+ / 15 / $450 / In-house |
| 4 | Services | 6 cards: maintenance, construction, repair, heater, hardscape, water features |
| 5 | Flagship: Bringing it Blue | Price-anchored maintenance offer ($450) |
| 6 | Portfolio | Before-and-after grid with click-to-expand lightbox |
| 7 | Pine Belt map | SVG map with all 15 towns as drawn-in pins |
| 8 | Testimonials | Reviews from Google + HomeAdvisor |
| 9 | Trust badge cluster | HomeAdvisor, Houzz, Google + Hayward, Jandy, Pentair partner brands |
| 10 | About / Justin | 40+ years combined experience, in-house, founder slot |
| 11 | CTA banner | "Get a free estimate" on a midnight pool background |
| 12 | Contact form | Name, phone, email, service interest, message |
| 13 | Footer | Logo, address, hours, social, sitemap, credit |

### CTA strategy

- **Primary CTA copy:** "Get a Free Estimate"
- **Secondary CTA copy:** "Call 601.336.0545"
- Appears: nav (button), hero, after services, after portfolio, in CTA banner, in footer. 6 placements.
- Form anchor: `#contact`.

---

## 3. Content Framework

### Hero headline options (pick one, build with the first)

1. **"Top-rated pool service for the Pine Belt."** — confident, geographic, claim is defensible (HomeAdvisor reviews back it).
2. **"40 years of Pine Belt pools, built by hand."** — heritage play, mirrors Adcock's "Since 1973" formula.
3. **"Pools, hardscape, heaters. One Hattiesburg crew, in-house."** — full-stack play, names the differentiator.

Subhead: "Installation, maintenance, hardscape, and heater repair across Hattiesburg, Petal, Laurel, and 12 more Pine Belt towns. Family-owned. In-house. 40+ years combined experience."

### Value-prop blocks (use exactly these, in this order)

1. **In-house, never subbed.** Every pool, deck, and pump is handled by the Kincan crew. No surprise contractors on your property.
2. **Pine Belt-only.** 15 towns. We know the soil, the codes, and the seasons. Our trucks live in Hattiesburg.
3. **Transparent pricing.** A $450 deep-clean. Free estimates on every install. Senior and military discounts.
4. **40+ years combined.** We've seen the pool you're worried about. We've fixed it before.

### Section copy direction

- **Services:** 6 cards, each 1 headline + 2-line description + "Learn more" link to the section anchor. No fluff.
- **Bringing it Blue:** Lead with the price. Show 3 photos of green-to-blue transformations. List what's included (drain, acid wash, refill, balance, filter).
- **Portfolio:** 5 named projects (Drake, Hart, Hicks, Minor, Pace). Each a before-and-after slider. Caption with one line about scope.
- **Map:** "We serve Hattiesburg and 14 surrounding towns." SVG with pins. Towns listed below.
- **Testimonials:** 4 best reviews, source-cited (Google, HomeAdvisor). Real names. Dates intact.
- **About:** 2-paragraph story. "40+ years combined" anchor. Founder slot (placeholder for Justin's photo). Promise: in-house, neighborly, on time.
- **Contact:** Phone-first. Then form. Then hours.

### SEO targets

| Page anchor | Target keyword |
|---|---|
| Home title | "Pool Service Hattiesburg MS | Kincan Water Solution" |
| Services section | "pool maintenance Hattiesburg", "pool repair Pine Belt" |
| Bringing it Blue | "pool deep clean Hattiesburg $450" |
| Heater repair card | "swimming pool heater repair Hattiesburg" (white-space keyword) |
| Map section | "pool service Petal MS", "pool service Laurel MS", + 12 more |
| About | "family-owned pool company Hattiesburg" |

Schema markup: `LocalBusiness` + `Service` for each of the 6 service lines + `AggregateRating` from existing reviews.

---

## 4. Conversion Playbook

**Primary goal:** phone call to 601.336.0545. Secondary: form submission.

**Lead capture:**
- Form fields: First name, phone (required), email, service interest (dropdown), message, town (dropdown of 15).
- Submit destination: client-side `mailto:` fallback wired now; placeholder note for Formspree / Netlify Forms wiring at deploy.
- No newsletter signup. No popups.

**Social proof placement:**
- Trust badges (HomeAdvisor, Houzz, Google, BBB) appear under the hero stats strip — first scroll.
- Partner brands (Hayward, Jandy, Pentair, Tarapools) in a quiet logo row above the footer.
- Testimonials section mid-page, after portfolio.

**Trust signal checklist:**
- ✅ Phone number in nav at all breakpoints
- ✅ "40+ years combined" badge
- ✅ "15 Pine Belt towns served" map
- ✅ Founder slot (Justin)
- ✅ Real before-and-after photography
- ✅ Transparent $450 price point
- ✅ HomeAdvisor + Houzz + Google badge cluster
- ✅ Hayward / Jandy / Pentair partner row
- ✅ Senior / military discount mention
- ✅ "Family-owned, locally operated" line

---

## 5. Technical Plan

- **Stack:** Vanilla HTML/CSS/JS. GSAP + ScrollTrigger from CDN.
- **Files:**
  - `site/index.html` (homepage)
  - `site/competitive-analysis.html` (already built)
  - `site/css/styles.css`
  - `site/js/main.js`
  - `site/robots.txt`, `site/sitemap.xml`
  - `site/assets/` (logo, portfolio, founders, favicon)
- **Deploy:** `netlify.toml` pins `publish = "site"`. `vercel.json` ships alongside.
- **Performance targets:** Lighthouse 90+ across the board. All images lazy-loaded. Single GSAP bundle. No webfont swap blocking.

---

## 6. Out of Scope for This Build (Phase 2 ideas)

- Individual town landing pages (15 of them, programmatic SEO)
- Blog
- Online booking calendar
- E-commerce / pool chemical sales
- Multi-language

These are deliberately deferred. The single-page rebuild captures 90% of the conversion lift.

---

## APPROVAL CHECKPOINT

Before the build starts, the user needs to confirm:

1. **Brand palette:** Pool cyan primary, midnight dark, sunset red accent. Locked?
2. **Typography:** Fraunces + Inter. Locked?
3. **Single-page architecture.** OK?
4. **Hero headline:** "Top-rated pool service for the Pine Belt." OK?
5. **$450 price anchor on the homepage.** OK?
6. **Owner reference:** I will write copy as "Justin and the Kincan crew." If a different name or framing, say so.

Once the user says go, the build starts.
