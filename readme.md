# Personal Portfolio + Admin Portal

A full-stack personal portfolio with a public-facing site and a protected admin panel for managing all content — no hardcoded data, everything is served from a PostgreSQL database through a FastAPI backend.

```
React + Vite  ──▶  FastAPI  ──▶  SQLAlchemy  ──▶  PostgreSQL
```

---

## Tech Stack

**Frontend:** React (Vite), React Router, plain CSS (no UI framework), `@fontsource/fraunces` + `@fontsource/ibm-plex-sans`
**Backend:** FastAPI, SQLAlchemy, Pydantic, PostgreSQL, bcrypt (password hashing), PyJWT (auth tokens)
**Auth:** JWT-based, single admin user, seeded from environment variables on first startup

---

## Project Structure

### Frontend (`frontend/src/`)

```
src/
├── main.jsx                  Entry point — wraps App in BrowserRouter + AuthProvider
├── App.jsx                   Top-level router: public site vs admin routes
├── index.css                 Design system (CSS variables, typography, buttons, utilities)
│
├── data/portfolio.js         Static, non-database content: navLinks (page structure only)
├── hooks/
│   ├── useReveal.js           Scroll-reveal animation hook
│   └── useActiveSection.js    Scroll-spy hook powering the navbar's active-link highlight
├── context/AuthContext.jsx    Admin JWT state: login, logout, token validity check
├── lib/api.js                 Fetch client: JSON requests + multipart file uploads
│
├── components/                Public site sections, one folder per component
│   ├── Navbar/  Hero/  EmbeddingField/  About/  Skills/  Projects/
│   ├── Experience/  Education/  Certifications/  Services/  Contact/  Footer/
│
└── pages/
    ├── PublicPortfolio.jsx    Composes all public components into the "/" page
    └── admin/
        ├── AdminLogin.jsx              /admin/login
        ├── AdminLayout.jsx             Sidebar + header shell wrapping admin routes
        ├── AdminDashboard.jsx          /admin — live record counts per entity
        ├── EntityManager.jsx           /admin/:entityKey — generic list/add/edit/delete
        ├── entityConfig.js             Defines fields/columns/endpoint for every entity
        └── components/
            ├── Sidebar.jsx / Header.jsx
            ├── ProtectedRoute.jsx      Redirects to /admin/login if not authenticated
            └── EntityFormModal.jsx     Add/Edit form, incl. image file picker
```

### Backend (`backend/app/`)

```
app/
├── main.py            App setup, CORS, auto-migration, admin user seeding, router registration
├── database.py        SQLAlchemy engine/session/Base
├── auth.py            Password hashing, JWT create/verify, get_current_admin dependency
│
├── models/            One SQLAlchemy model per table
├── schemas/           One Pydantic schema pair (Create + response) per entity
└── routes/            One FastAPI router per entity, full CRUD
```

---

## Database Entities

| Entity | Table | Notes |
|---|---|---|
| Projects | `projects` | `title`, `description`, `image`, `github` (required), `demo` (optional) |
| Skills | `skills` | Flat rows (`category`, `name`) — grouped client-side by category |
| Experience | `experience` | Structured `start_month`/`start_year`/`end_month`/`end_year`; `duration` computed server-side. Legacy `start`/`end` text fields kept but unused going forward |
| Education | `education` | `degree`, `school`, `start`, `end`, `description`, `tech` (comma-separated) |
| Certifications | `certifications` | `name`, `issuer`, `date`, `url` (optional) |
| Services | `services` | `title`, `description` |
| Social Links | `social_links` | Generic `{platform, url}` rows — covers GitHub/LinkedIn/Email/etc. |
| About | `about` | Singleton profile: `name`, `title`, `tagline`, `location`, `bio`, `resume_url`, `image` |
| Highlights | `highlights` | Stat cards for the About section: `value`, `label` |
| Contact Messages | `contact_messages` | Visitor form submissions: `name`, `email`, `message` |
| Admin User | `admin_users` | Single admin row, seeded from env vars, password stored hashed only |

---

## Authentication & Authorization

- `POST /api/auth/login` — email + password → JWT access token
- `GET /api/auth/me` — verifies a token is still valid
- **Public (no auth needed):** all `GET` list/detail endpoints, plus `POST /api/contact` (visitor form submissions)
- **Protected (admin JWT required):** all `POST`/`PUT`/`DELETE` endpoints, plus `GET`/`PUT`/`DELETE /api/contact` (reading/managing visitor messages is admin-only, even though submitting one isn't)
- Passwords are hashed with bcrypt and never returned in any API response
- Invalid or expired tokens return `401`

---

## Image Uploads

`POST /api/upload` (admin-only) accepts a file (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, max 5MB), saves it to `app/static/uploads/`, and returns a URL. That URL is then saved as the `image` field on whichever entity (About, Projects) it belongs to — the upload endpoint itself is entity-agnostic. Files are served back at `/static/uploads/<filename>`.

In the admin form, any field configured with `type: 'image'` in `entityConfig.js` automatically renders a file picker (not a URL text box) that uploads on selection.

---

## Auto-Migration

`main.py` runs `sync_missing_columns()` on every startup. It compares each model's defined columns against what actually exists in the live database and:
- Adds any missing column (`ALTER TABLE ... ADD COLUMN`)
- Relaxes any column from `NOT NULL` to nullable, if the model now allows null

It **never** drops or renames columns, and never tightens a constraint — so it's always safe to run against a database that already has data. This means adding a new field to any model only requires restarting the server — no manual SQL, no Alembic.

---

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
pip install bcrypt pyjwt python-multipart
```

Create/update `backend/.env`:
```dotenv
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=choose-a-strong-password
JWT_SECRET=<generate with: python -c "import secrets; print(secrets.token_hex(32))">
```

Run:
```bash
uvicorn app.main:app --reload
```
On first run, this creates all tables, runs the auto-migration, and seeds your one admin user from the `.env` values above (password stored hashed, never in plain text).

### Frontend

```bash
cd frontend
npm install
npm install react-router-dom
npm run dev
```

The dev server proxies `/api` and `/static` requests to `http://localhost:8000` (see `vite.config.js`) — **both servers must be running** for the app to work.

---

## Running the App

| URL | What |
|---|---|
| `http://localhost:5173/` | Public portfolio |
| `http://localhost:5173/admin/login` | Admin sign-in |
| `http://localhost:5173/admin` | Dashboard (record counts) |
| `http://localhost:5173/admin/<entity>` | CRUD for that entity (`projects`, `skills`, `experience`, `education`, `certifications`, `services`, `social-links`, `about`, `highlights`, `contact`) |
| `http://localhost:8000/docs` | Auto-generated FastAPI Swagger docs |

---

## Adding a New Field to Any Entity — Checklist

1. **`app/models/<entity>.py`** — add the `Column(...)`
2. **`app/schemas/<entity>.py`** — add to both the `Create` and response schema classes
3. **`app/routes/<entity>.py`** — assign it in both the create and update handlers
4. **Restart the backend** — auto-migration adds the column automatically
5. **`frontend/src/pages/admin/entityConfig.js`** — add `{ name, label, type }` to that entity's `fields` array, or the admin form won't show it
6. **Public component** (if the public site should display it) — update the relevant `.jsx` file

---

## Known Limitations

- No Alembic — schema changes are additive-only (see Auto-Migration above); this is intentional for this project's stage, not an oversight
- Single admin user only, no roles/permissions
- No password-reset flow — change credentials by deleting the row in `admin_users` and restarting with new `.env` values
- Contact messages have no timestamp field
- Project `tags` field from early mockups was intentionally dropped — the real `Project` model only has `title`, `description`, `image`, `github`, `demo`