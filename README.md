# Pankaj Studio

Premium photography and cinema portfolio website with a built-in admin panel for managing projects and uploading images — **no Cloudinary or external image storage needed**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | MongoDB Atlas (Mongoose) |
| Image Storage | Local `/public/uploads/` (processed via Sharp) |
| Video | YouTube / Vimeo embed URLs |
| Auth | JWT in HTTP-only cookies (bcryptjs) |
| Email | Nodemailer (Gmail SMTP) |
| Forms | react-hook-form |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans, DM Mono) |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and fill in:
- `MONGODB_URI` — from [MongoDB Atlas](https://cloud.mongodb.com)
- `JWT_SECRET` — any long random string (e.g. 64 random characters)
- `SMTP_USER` / `SMTP_PASS` — Gmail + App Password for contact form emails

### 3. Create your admin account (run once)
```bash
node scripts/create-admin.js
```
Follow the prompts to set your username and password.

### 4. Start dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Project Structure

```
pankaj-studio/
├── app/
│   ├── layout.jsx              Root layout (fonts, metadata)
│   ├── page.jsx                Homepage
│   ├── globals.css             Global styles + CSS variables
│   ├── loading.jsx             Loading spinner
│   ├── not-found.jsx           404 page
│   ├── about/page.jsx          About + Process
│   ├── contact/page.jsx        Contact / Booking
│   ├── work/
│   │   ├── page.jsx            Portfolio archive
│   │   └── [slug]/page.jsx     Individual project detail
│   └── api/
│       ├── projects/           Public API (GET)
│       ├── contact/            Contact form email
│       └── admin/              Protected admin API
│           ├── login/          POST — sign in
│           ├── logout/         POST — sign out
│           ├── upload/         POST — upload image
│           └── projects/       CRUD for projects
│
├── app/admin/                  Admin panel pages (protected)
│   ├── login/page.jsx          Login screen
│   ├── dashboard/page.jsx      Stats + recent projects
│   └── projects/
│       ├── page.jsx            All projects list
│       ├── new/page.jsx        Create new project
│       └── [id]/page.jsx       Edit project
│
├── components/
│   ├── Navbar.jsx              Sticky nav + mobile menu
│   ├── Footer.jsx              Footer
│   ├── HeroAndCinema.jsx       Homepage hero + cinema lounge
│   ├── MilestonesHub.jsx       Portfolio filter grid
│   ├── AccordionFAQ.jsx        FAQ accordion
│   ├── AboutStrip.jsx          Stats strip
│   ├── BookingForm.jsx         Contact form
│   └── admin/
│       ├── AdminLogoutButton.jsx
│       ├── DeleteProjectButton.jsx
│       ├── ImageUploader.jsx    Drag-and-drop single image
│       ├── GalleryUploader.jsx  Multi-image gallery
│       └── ProjectForm.jsx      Full project create/edit form
│
├── lib/
│   ├── mongodb.js              DB connection singleton
│   ├── auth.js                 JWT helpers
│   ├── upload.js               Local image save + Sharp processing
│   └── utils.js                Shared helpers
│
├── models/
│   ├── AdminUser.js            Admin user schema
│   └── MediaProject.js         Project schema
│
├── middleware.js               Protects /admin/* routes
├── scripts/create-admin.js     One-time admin setup script
└── public/uploads/             Uploaded images stored here
```

---

## Admin Panel Usage

### Log in
Go to `/admin/login` and enter the credentials you created with `create-admin.js`.

### Add a project
1. Go to Dashboard → **+ New Project**
2. Fill in title, category, date, location, story
3. Upload a **cover image** (drag & drop, up to 15MB — auto-compressed)
4. Optionally add gallery images (up to 60)
5. Optionally add a YouTube embed URL for the cinema lounge
6. Toggle **Published** ON when ready
7. Toggle **Featured** ON to show it in the homepage hero

### Edit / delete
Click **Edit →** next to any project. To delete, use the Delete button in the edit page (asks for confirmation).

### Image uploads
- Images are saved to `/public/uploads/{category}/`
- Automatically resized (max 1920px wide) and converted to WebP via Sharp
- Blur placeholders generated automatically for smooth loading
- No Cloudinary or external service needed

---

## Customise

| What | Where |
|---|---|
| Studio name | `.env.local` → `NEXT_PUBLIC_STUDIO_NAME` |
| Contact email | `.env.local` → `CONTACT_RECIPIENT` |
| Location / city | `components/Footer.jsx`, `app/contact/page.jsx` |
| Social links | `components/Footer.jsx` |
| About text + bio | `app/about/page.jsx` |
| Stats (340+ weddings etc.) | `components/AboutStrip.jsx`, `app/about/page.jsx` |
| FAQ questions | `components/AccordionFAQ.jsx` → `DEFAULT_FAQS` array |
| Favicon | Replace `public/favicon.svg` |

---

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Add all `.env.local` variables in Vercel project settings
4. **Important:** Enable **Persistent Storage** or use a CDN for uploads in production. Vercel is serverless — `/public/uploads/` resets on each deploy. Options:
   - Use [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (replace `lib/upload.js`)
   - Or host on a VPS/DigitalOcean App Platform where the filesystem persists

### For VPS / self-hosted (recommended for image uploads)
```bash
npm run build
npm start
```
Images persist on disk since the server is always-on.

---

## Adding Gmail App Password

1. Go to your Google Account → Security → 2-Step Verification (enable if not already)
2. Search for "App Passwords" → Create one for "Mail"
3. Copy the 16-char password into `SMTP_PASS` in `.env.local`
