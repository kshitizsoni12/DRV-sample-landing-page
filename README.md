# DRV Assistants — Landing Page

A premium, scroll-driven business landing page for **DRV Assistants**, built with React, Vite, GSAP, ScrollTrigger, Lenis, and Vanilla CSS. Designed with an editorial aesthetic, oversized typography, image-mask reveals, smooth scroll choreography, and tactile interactive components.

---

## 🌟 Features & Highlights

- **4-Color Design System**: Warm Ivory (`#F7F3F0`), Coral (`#FF684F`), Charcoal (`#292522`), and White (`#FFFFFF`).
- **Kinetic Hero**: Word-by-word text entrance, subtle parallax dotted world map, high-resolution remote professional photography, and restrained magnetic CTAs (no 3D canvas / WebGL).
- **Infinite Brand Ticker**: Seamless, mathematically exact marquee loop showcasing partner brands with accessibility guards (`aria-hidden` duplicate tracks).
- **Animated Statistics**: Viewport-triggered count-up animations for `10+` (Years Of Experience), `1k+` (Clients), and `24/7` (Support) with cancellation cleanup and reduced-motion fallback.
- **Editorial Benefits (Why DRV?)**: Desktop GSAP pinning choreography revealing 6 benefit statements around a central portrait.
- **Tactile Services**: 4-card grid featuring custom neural line icons, decorative quadrant arcs, and hover elevation.
- **Interactive Process Timeline**: 3-step visual workflow with animated SVG connecting stroke line.
- **Touch-Friendly Testimonial Carousel**: Swipeable, keyboard-accessible slider with spotlight indicators and responsive desktop/mobile layouts.
- **Transparent Pricing**: Data-driven cards comparing Part Time ($270/mo) and Full Time ($500/mo) with full capability checklists.
- **Accessible FAQ Accordion**: CSS Grid-powered expansion preventing text clipping, with explicit ARIA triggers and panel associations.
- **Full-Featured Navigation & Modals**: Sticky frosted glass navbar, responsive mobile drawer with scroll-lock, and honest informational modals for Careers, Blog, and Legal policies.
- **Motion & Accessibility**: Complete `prefers-reduced-motion` support across Lenis, GSAP, and CSS. Keyboard focus indicators across all interactive elements.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component architecture and state management |
| **Vite** | Modern frontend build tooling and HMR |
| **GSAP 3 + ScrollTrigger** | Scroll choreography, sequence reveals, pinning, and parallax |
| **Lenis** | Physics-based smooth scrolling synchronized with ScrollTrigger |
| **Lucide React** | Clean, accessible vector icons |
| **Vanilla CSS** | Design tokens, responsive grids, and micro-interactions |

*Note: This is a 100% frontend static project. No backend, database, or authentication is required.*

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or later (Node v22.x recommended)
- **npm**: v9.0.0 or later

---

## 🚀 Installation & Local Development

1. **Clone or open the repository**:
   ```bash
   cd "d:/webdevlopment/projects/insight analytics"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to [http://localhost:5173/](http://localhost:5173/).

---

## 🧪 Linting & Production Build

- **Run linter (Oxlint)**:
  ```bash
  npm run lint
  ```

- **Compile production bundle**:
  ```bash
  npm run build
  ```
  The compiled output is generated in the `dist/` directory.

- **Preview production build locally**:
  ```bash
  npm run preview
  ```

---

## 📁 Project Structure & Assets

```
insight analytics/
├── public/
│   ├── favicon.svg               # DRV brand favicon
│   └── images/
│       ├── hero-person.webp       # Hero professional portrait
│       ├── support-team.webp      # Why DRV central team specialist
│       ├── testimonial-alex.webp  # Alex Carter testimonial portrait
│       ├── testimonial-samantha.webp # Samantha Lee testimonial portrait
│       ├── team-avatars.webp      # Final CTA team avatar cluster
│       └── brands-strip.webp      # Partner brand logo marquee strip
├── src/
│   ├── components/
│   │   ├── AnimatedCounter.jsx    # Viewport-triggered smooth counting numbers
│   │   ├── BrandTicker.jsx        # Seamless infinite partner marquee
│   │   ├── DRVLogo.jsx            # Brand vector medallion logo
│   │   ├── Footer.jsx             # Charcoal footer with modals & contact info
│   │   ├── InfoModal.jsx          # Accessible dialog for Career, Blog & Legal
│   │   ├── MagneticButton.jsx     # Tactile button with physics & touch guards
│   │   ├── Navbar.jsx             # Glassmorphism navbar with mobile drawer
│   │   ├── SectionBadge.jsx       # Reusable capsule pill badge
│   │   └── WorldMap.jsx           # Dotted world map SVG with remote hub pulses
│   ├── sections/
│   │   ├── Hero.jsx               # Kinetic headline & hero composition
│   │   ├── TrustedBy.jsx          # Partner brands marquee section
│   │   ├── Stats.jsx              # 10+, 1k+, 24/7 metrics panel
│   │   ├── WhyDRV.jsx             # Pinned editorial benefits section
│   │   ├── Services.jsx           # 4-card capability overview
│   │   ├── Process.jsx            # 3-step visual onboarding timeline
│   │   ├── Testimonials.jsx       # Touch-enabled review carousel
│   │   ├── Pricing.jsx            # Data-driven Part Time & Full Time pricing
│   │   ├── FAQ.jsx                # Zero-clipping accessible accordion
│   │   └── FinalCTA.jsx           # Team avatars and trial conversion panel
│   ├── data/
│   │   └── siteContent.js         # Single source of truth for text & claims
│   ├── styles/
│   │   ├── tokens.css             # 4-color palette, typography & radii
│   │   ├── global.css             # Resets, Lenis utilities & focus rules
│   │   └── animations.css         # Keyframes and motion styling
│   ├── App.jsx                    # Root layout with Lenis & ScrollTrigger sync
│   └── main.jsx                   # React entry point
├── crop_assets.js                 # Automated asset extraction from ./img/
└── package.json
```

---

## ♿ Motion & Accessibility Specifications

- **Reduced Motion Support**:
  When a user enables `prefers-reduced-motion: reduce`:
  - Lenis smooth scrolling is bypassed, preserving instant native scrolling.
  - GSAP entrance animations, parallax drift, and desktop pinning are safely disabled.
  - Ticker marquee continuous animation is paused.
  - All content, stats counters, and images render immediately without delays.
- **Keyboard Navigation**:
  - Full visible focus indicator (`outline: 2px solid var(--color-coral)` with `outline-offset: 3px`).
  - Mobile menu supports <kbd>Escape</kbd> to dismiss.
  - Carousels and Modals support arrow keys, escape, and focus containment.
- **Scroll Offsets**:
  - Global `[id] { scroll-margin-top: 96px; }` prevents fixed navbar from clipping section headings.

---

## 🌐 Static Frontend Deployment

Since this project has no backend dependencies, it can be deployed to any static host:

### Vercel / Netlify / Cloudflare Pages / GitHub Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `>= 18.0.0`

---

## 📝 Verification Checklist for Site Owner

Before publishing this site in a commercial environment, please verify the following items configured in `src/data/siteContent.js`:

1. **Partner Brand Authorizations**: Confirm commercial authorization to display logos for Forbes, Entrepreneur, Yahoo, CNN, Fox, and HP.
2. **Metrics & Experience**: Verify `10+` years and `1k+` clients claims against actual company records.
3. **Customer Testimonials**: Confirm approved attribution for Alex Carter and Samantha Lee quotes.
4. **Physical Address & Phone**: Replace `123 Business Ave, Suite 100, Metro City` and `+1 (800) 123-4567` with genuine corporate details.
5. **Legal Agreements**: Provide official Privacy Policy and Terms of Service documents to replace informational modal copy.
