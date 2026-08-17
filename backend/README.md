# WanderLens Backend

A separate REST API for the locked WanderLens React frontend. It uses Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, validation, CORS, and centralized error handling.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Set MONGODB_URI and a strong JWT_SECRET in .env
npm run seed
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`. The frontend runs on Vite's default `http://localhost:5173` and expects the API at `http://localhost:5000/api` (set via `VITE_API_URL` in `Frontend/.env`).

All responses use `{ success, message, data }`; errors use `{ success:false, message, errors:[] }`. Send `Authorization: Bearer <token>` for protected routes. The seed creates `admin@wanderlens.local` with password `Admin12345!`; change it immediately outside local development.

## Main endpoint groups

| Area | Endpoints |
|---|---|
| Auth | `/api/auth/register`, `/login`, `/logout`, `/me` |
| Discovery | `/api/destinations`, `/places`, `/viewpoints`, `/categories`, `/search?q=` |
| Name lookup | `/api/destinations/name/:name`, `/places/name/:name`, `/viewpoints/name/:name` |
| Saved items | `/api/saved-places` (GET, POST, DELETE, `/check/:id`) |
| Trips | `/api/trips` (GET, POST, `/trips/:id` GET/PUT/DELETE) |
| Reviews | `/api/reviews` (GET, POST) |
| Admin | `/api/admin/users` (GET, PATCH, DELETE) |

## Discovery endpoint behaviour

All list endpoints (`destinations`, `places`, `viewpoints`, `categories`) support:

- `page` and `limit` for pagination; responses return `{ items, pagination }`.
- `search` for a text search across names and descriptions.
- `category` (comma-separated ObjectIds are treated as an `$in` filter, e.g. `?category=id1,id2`).
- `type` (comma-separated, `$in` filter) on places.
- `destination` to filter places/viewpoints by a destination ObjectId.
- `rating` (minimum rating), `sort` (`az`, `rating`, `popularity`; defaults to `-createdAt`).
- `featured` / `popular` flags.

Resource controllers expose a `getByName` lookup so the frontend can use human-readable slugs (`/destination/:name`, `/place/:name`) without resolving ids first.

## Seed data

`npm run seed` wipes and re-creates the collections with category names that match the frontend UI (`Mountains`, `Historical`, `Nature`, `Beaches`, `Viewpoints`, `Adventure`, `Food`, `Museums`, `Shopping`), 9 destinations, ~20 places, ~9 viewpoints, and the admin user. Destinations, places, and viewpoints include `images`, `rating`, `reviewCount`, `popularity`, `featured`, and other display fields the frontend renders. Images are URL arrays; no binary image data is stored in MongoDB.