<div align="center">

# 📸 Pankaj Studio

### *Capturing life. Preserving legacy. In 4K.*

A premium, full-stack photography & cinematography platform built for a real, working studio — with 15+ years of legacy and 2000+ weddings behind it — now living on the web.

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-pankajstudio.in-6C5CE7?style=for-the-badge)](https://www.pankajstudio.in/)
![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

**[📸 Visit Live Site](https://www.pankajstudio.in/)   |  [🐞 Report an Issue](https://github.com/zshivam/Pankajstudio/issues) |  [📩 Contact](mailto:zshivam19@gmail.com)**

</div>

---

## 🎬 The Story

Most portfolio projects are demos. **This one is in production**, serving a real photography studio in Deoria, Uttar Pradesh, with a client base spread across India.

Pankaj Studio has spent over a decade behind the lens — weddings, pre-weddings, maternity shoots, milestone birthdays — building a reputation on one rule: *zero compromise on quality.* This repository is the digital storefront that carries that promise online: a fast, cinematic, mobile-first website where visitors browse the studio's work, watch 4K films, and book a session — while the studio itself manages everything through a clean backend, with zero manual server upkeep.

> *"Capturing the beauty of your moments, weaving them into eternity."*

---

## 📋 Table of Contents

- [Highlights](#-highlights)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Category Reference](#-category-reference)
- [Deployment](#-deployment)
- [Engineering Notes](#-engineering-notes)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## ⚡ Highlights

| | |
|---|---|
| 🎥 | **Cinema Lounge** — a dedicated showcase of 4K wedding films, embedded straight from YouTube with a distraction-free, branded player |
| 🖼️ | **Signature Milestones gallery** — a category-driven portfolio (weddings, pre-weddings, maternity, birthdays, corporate & more) that scales from 10 projects to 10,000 without a redesign |
| 📅 | **End-to-end booking flow** — a validated enquiry form that emails the studio directly, no third-party form service required |
| ⚙️ | **Content fully driven by an API** — every project on the site lives in MongoDB and is served through clean REST routes, so new work goes live without touching a line of code |
| 🌩️ | **Zero-downtime media pipeline** — every photo and video is served via Cloudinary CDN, solving the classic "serverless filesystem is ephemeral" trap from day one |
| 📱 | **Pixel-tuned responsiveness** — hunted down and fixed real mobile overflow bugs so the site feels native on a phone, not just "responsive" on paper |

---

## 🚀 Features

### For Visitors
- **Cinematic hero carousel** rotating through the studio's best work the moment the page loads
- **Cinema Lounge** — embedded 4K film reels (weddings, engagements, pre-wedding teasers) with a branded, minimal-distraction player
- **Signature Milestones portfolio**, filterable by category — Wedding, Pre-Wedding, Maternity, Baby Shoot, Birthday, Corporate, and Cinema Film
- **"Behind the Lens"** — a dedicated team/about page telling the human story behind the studio
- **Animated FAQ accordion** covering booking timelines, pricing structure, travel, and delivery turnaround
- **One-click booking form** with real-time validation (`react-hook-form`) that lands straight in the studio's inbox
- **Direct WhatsApp & social links** for instant, no-friction contact
- Fully responsive design, tuned specifically for mobile viewing — not just "it doesn't break," but genuinely comfortable to browse

### Under the Hood
- **Dynamic project model** (`MediaProject`) — title, category, location, event date, cover image, published/featured flags — all queryable and filterable
- **RESTful API** for projects: list, create, fetch-by-slug, update, delete
- **Transactional email** on every booking enquiry via Nodemailer + Gmail SMTP
- **Cloudinary-backed media layer** — images and videos are never stored on the server, so nothing gets wiped on redeploy
- **SEO-conscious metadata** — per-page titles, descriptions, and Open Graph tags so the studio's work is discoverable, not just visible

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS + custom CSS-in-JS |
| **Database** | MongoDB Atlas via Mongoose |
| **Media / CDN** | Cloudinary |
| **Video** | YouTube embeds |
| **Email** | Nodemailer (Gmail SMTP) |
| **Forms** | react-hook-form |
| **Fonts** | Cormorant Garamond, DM Sans, DM Mono (Google Fonts) |
| **Hosting** | Vercel |

---

## 📁 Project Structure

```
Pankajstudio/
├── app/                        # Next.js App Router
│   ├── layout.jsx              # Root layout (fonts, metadata)
│   ├── page.jsx                # Homepage
│   ├── about/                  # About + Behind the Lens
│   ├── contact/                # Booking / contact page
│   ├── work/                   # Portfolio archive + [slug] project detail
│   └── api/
│       ├── projects/           # GET all / POST new / [slug] GET-PATCH-DELETE
│       └── contact/            # POST booking enquiry → email
│
├── components/                  # Reusable UI
│   ├── Navbar.jsx               # Sticky nav + mobile menu
│   ├── Footer.jsx
│   ├── HeroAndCinema.jsx        # Hero carousel + Cinema Lounge
│   ├── MilestonesHub.jsx        # Portfolio switcher + grid
│   ├── AccordionFAQ.jsx
│   ├── AboutStrip.jsx           # Homepage stats strip
│   └── BookingForm.jsx
│
├── lib/                          # mongodb.js, cloudinary.js, utils.js
├── models/                       # MediaProject.js (Mongoose schema)
├── public/                       # Static assets
└── .env.local.example
```

---

## 🧑‍💻 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/zshivam/Pankajstudio.git
cd Pankajstudio
npm install
```

### 2. Configure environment variables
```bash
cp .env.local.example .env.local
```

### 3. Run in development
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)**

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers |
| `CLOUDINARY_CLOUD_NAME` | [Cloudinary Dashboard](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Gmail App Password |
| `CONTACT_RECIPIENT` | Email to receive booking enquiries |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://pankajstudio.in` |
| `NEXT_PUBLIC_STUDIO_NAME` | `Pankaj Studio` |

---

## 🔌 API Reference

Add a project directly via the API:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aisha & Rohit",
    "slug": "aisha-rohit-udaipur-2024",
    "category": "wedding",
    "storyHighlight": "Forty hands in haldi, one heart forever.",
    "location": { "city": "Udaipur", "venue": "Taj Lake Palace", "country": "India" },
    "eventDate": "2024-11-18",
    "coverImage": {
      "url": "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/cover.jpg",
      "altText": "Aisha and Rohit at sunset",
      "width": 1920,
      "height": 1080
    },
    "isPublished": true,
    "featured": true
  }'
```

## 🗂 Category Reference

| Value | Display Label | Used In |
|---|---|---|
| `wedding` | Wedding | Milestones Hub |
| `pre-wedding` | Pre-Wedding | Milestones Hub |
| `maternity` | Maternity | Milestones Hub |
| `baby` | Baby Shoot | Milestones Hub |
| `birthday` | Birthday | Milestones Hub |
| `corporate` | Corporate | Milestones Hub |
| `cinema-4k` | Cinema Film | Cinema Lounge |

---

## ☁️ Deployment

Deployed on **Vercel**:
1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

> For MongoDB Atlas, whitelist `0.0.0.0/0` or add Vercel's specific IP ranges.

---

## 🧠 Engineering Notes

A few real problems this project solved in production, not just in theory:

- **The ephemeral filesystem trap** — Vercel's serverless functions don't persist local file writes between invocations. Uploaded media was migrated entirely to **Cloudinary**, so nothing depends on the server's disk.
- **Mobile overflow bugs** — horizontal scroll and layout breakage on smaller viewports were tracked down and fixed rather than papered over with `overflow: hidden`.
- **Image-heavy team page** — portraits of varying aspect ratios are rendered with `object-fit: contain` over a blurred background layer, so every photo looks intentional instead of cropped.

---

## 🗺️ Roadmap

- [ ] Admin dashboard polish for non-technical project uploads
- [ ] Client-facing private gallery delivery links
- [ ] Automated booking-deposit payment integration
- [ ] Analytics dashboard for enquiry conversion

---

## 👤 Author

**Shivam Sahani**
Full-Stack Developer · B.Tech CS, DSMNRU Lucknow

[![GitHub](https://img.shields.io/badge/GitHub-zshivam-181717?style=flat-square&logo=github)](https://github.com/zshivam)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-zshivam24-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/zshivam24)
[![Email](https://img.shields.io/badge/Email-zshivam19%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:zshivam19@gmail.com)

---

<div align="center">

**⭐ If this project inspired you, consider starring the repo!**

</div>
