# Mall of America — Interactive Sales Deck

A cinematic, browser-based interactive sales tool for Mall of America — built as a luxury pitch deck for prospective retail tenants, sponsors, and event partners.

**Live URL:** https://interactive-mega-mall-sales-deck.vercel.app

---

## What It Is

This is not a website or a static slide deck. It is a purpose-built interactive sales tool that replaces the fragmented process of pulling up YouTube videos, PDFs, and spreadsheets during a sales call. It tells the property's story through video, data, imagery, and narrative — with the visual polish of a luxury brand and the interactivity of a modern web experience.

**Primary audience:** Decision-makers at brands, agencies, and production companies evaluating whether to invest a retail presence, sponsorship, or event booking at Mall of America.

**Business objectives:**
- Drive retail leasing deals (luxury, mid-tier, flagship, pop-up)
- Drive sponsorship and brand partnership deals
- Drive event bookings (concerts, brand activations, corporate events)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Inline CSS with CSS custom properties |
| Animation | Framer Motion (LazyMotion for performance) |
| Fonts | next/font/google — zero render blocking |
| Images | next/image — automatic WebP + lazy loading |
| AI Chatbot | Groq API (llama-3.1-8b-instant) |
| Deployment | Vercel |

---

## Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/VinayJoshi16/Interactive-Mega-Mall-Sales-Deck.git
cd Interactive-Mega-Mall-Sales-Deck

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a .env.local file in the root:
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# Get a free Groq API key at: https://console.groq.com

# 4. Run the dev server
npm run dev

# 5. Open http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Free API key from console.groq.com |
| `NEXT_PUBLIC_SITE_URL` | No | Your production URL for OG meta tags |

---

## Project Structure
src/
app/
page.tsx              # Main shell — cursor, intro, lazy sections
layout.tsx            # Fonts, metadata, OG tags
api/chat/route.ts     # Groq AI chatbot API route
components/
Nav.tsx               # Fixed sidebar dot navigation
IntroAnimation.tsx    # Cinematic intro with particle effects
sections/
Hero.tsx            # Full-screen video hero
WhyUs.tsx           # Demographics, stats, image stack
Retail.tsx          # Tenant marquee, leasing categories
Luxury.tsx          # Full-bleed image, brand strip
Dining.tsx          # Two-column layout, highlights
Entertainment.tsx   # VideoPlayer, YouTube shorts, attractions
Events.tsx          # Venue cards, past events, booking CTA
CTA.tsx             # Sponsorship tiers + contact form
ui/
StatCard.tsx        # Animated count-up stat card
VideoPlayer.tsx     # YouTube embed with poster facade
CTAButton.tsx       # Primary / secondary / ghost variants
ChatBot.tsx         # AI leasing assistant chat panel
lib/
data.ts               # All content, stats, copy — single source of truth
animations.ts         # Framer Motion variants — shared across sections
styles/
globals.css           # CSS variables, shared primitives, reveal animations
public/
images/                 # AI-generated + real property images
intro/                # Cinematic intro sequence images
---

## Sections Covered

| Section | Business Goal |
|---|---|
| Cinematic Intro | Immediate emotional impact — sets premium tone |
| Hero | Scale, energy, differentiation in 10 seconds |
| Why This Property | Location, demographics, regional reach |
| Retail | Tenant mix, leasing categories, availability |
| Luxury | Elevated positioning, premium corridor |
| Dining & Lifestyle | Food as destination, dwell time data |
| Entertainment | Nickelodeon Universe, SEA LIFE — key differentiators |
| Events Platform | Venue specs, past events, booking CTA |
| Sponsorship | Partnership tiers, audience metrics |
| Contact / CTA | Three conversion paths + contact form |

---

## AI Tools Used

| Tool | What It Was Used For |
|---|---|
| **Claude (Anthropic)** | Architecture planning,debugging |
| **Groq / Llama 3.1** | Live AI leasing assistant chatbot (free, 14K requests/day) |
| **Midjourney / DALL-E** | AI-generated section images (hero, luxury corridor, event crowd, food hall, sponsor activation) |
| **ChatGPT** | Copy refinement and section headlines |

### AI Asset Details

All 5 primary section images were AI-generated:
- `hero.webp` — Mall interior with Nickelodeon Universe, crowds, glass ceiling
- `luxury.webp` — Luxury retail corridor (Chanel, Saint Laurent, Gucci)
- `event.webp` — Concert crowd with stage lighting and confetti
- `dining.webp` — Premium food hall, busy lunch crowd
- `sponsor.webp` — Brand activation pop-up (Laneige) in mall atrium

---

## Design Decisions

**1. Cinematic intro over instant load**
The intro animation sets the tone immediately — it signals premium quality before a single product section loads. The 10-second sequence with flying images, particle cursor effects, and the hero reveal creates the "wow" moment the brief requires.

**2. Dark luxury aesthetic**
Inspired by Apple, Tesla, and Saint Laurent — near-black backgrounds (#080808), gold accents (#C8A96E), Cormorant Garamond serif paired with DM Sans. This palette signals premium and commands attention.

**3. Non-linear navigation**
Fixed sidebar dot navigation with IntersectionObserver tracking allows viewers to jump to any section instantly — critical for live sales calls where a prospect asks "can you show me the event spaces?"

**4. Video-first storytelling**
YouTube background video in the hero (lazy-loaded after 3s for performance), VideoPlayer component with poster facade, and YouTube Shorts in the Entertainment section. Video is the primary medium, not decoration.

**5. AI chatbot as sales tool**
The "Ask Alex" chatbot is powered by Groq's free Llama 3.1 model with a system prompt loaded with all property data. It acts as a 24/7 sales assistant that can answer leasing questions, quote venue capacities, and route serious leads to the team.

**6. Single data source**
All content lives in `src/lib/data.ts`. No hardcoded copy in components. This makes the deck white-labelable for any property — change `data.ts` and the entire deck updates.

---

## Performance

| Metric | Score |
|---|---|
| Performance (Desktop) | 70+ |
| Performance (Mobile) | 66+ |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 100 |
| Core Web Vitals (Desktop) | **PASSED** |

Key optimizations:
- `next/font/google` eliminates render-blocking font requests
- YouTube iframe loads after 3s delay — hero image shown first for LCP
- `LazyMotion` with `domAnimation` reduces Framer Motion bundle ~30%
- All sections below fold loaded via `dynamic()` (code splitting)
- Event delegation replaces per-element cursor listeners (fixes TBT)
- `next/image` for automatic WebP conversion and lazy loading

---

## What I Would Improve With More Time

1. **Segmented leasing paths** — tabbed deep-dive by category (Luxury / F&B / Pop-up / Mid-tier) with tailored copy and floor plan visualization per segment
2. **Venue sub-modules** — dedicated full-page experiences for the Grand Atrium, Rotunda, and North Garden Hall with 360° imagery
3. **Real visitor data integration** — live foot traffic API or embedded analytics dashboard
4. **CMS integration** — connect `data.ts` to a headless CMS so the sales team can update copy without touching code
5. **Analytics** — track which sections get most engagement, which CTAs get clicked, and time-on-section for sales team insights

---

## Submission

- **Live URL:** https://interactive-mega-mall-sales-deck.vercel.app/
- **GitHub:** https://github.com/VinayJoshi16/Interactive-Mega-Mall-Sales-Deck
