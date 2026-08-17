# Frontend Integration

WanderLens is a React 19.2.8 application using Vite 8, React Router 7, Tailwind CSS 4, and Lucide React. Run it from `Frontend/` with `npm install` and `npm run dev`; Vite uses port 5173 by default.

The frontend now talks to this backend through a small API layer in `Frontend/src/api/` (`client.js` wraps `fetch` and attaches the JWT; `index.js` exposes typed endpoint helpers plus mapping functions that reshape backend documents into exactly the shapes the locked UI already consumed). No page layout or styling was changed — only data sources.

## Environment

`Frontend/.env` (and `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

## API integration map

| Frontend feature | Backend endpoint | Method | Auth |
|---|---:|---:|
| Registration screen | `/api/auth/register` | POST | No |
| Login screen | `/api/auth/login` | POST | No |
| Session restore / current profile | `/api/auth/me` | GET | Yes |
| Landing hero / search | `/api/search?q=` | GET | No |
| Destinations listing | `/api/destinations?page&limit` | GET | No |
| Destination details | `/api/destinations/name/:name` | GET | No |
| Explore places | `/api/places?search&category&type&rating&sort&limit` | GET | No |
| Categories (with counts) | `/api/categories` | GET | No |
| Viewpoints page | `/api/viewpoints?limit=100` | GET | No |
| Place details | `/api/places/name/:name` | GET | No |
| Related places | `/api/places?destination=:id` | GET | No |
| Saved items | `/api/saved-places` (GET/POST/DELETE, `/check/:id`) | — | Yes |
| Trip planning | `/api/trips` (GET/POST, `/trips/:id` PUT) | — | Yes |

## Frontend files that changed

- `Frontend/.env`, `Frontend/.env.example` — API base URL.
- `Frontend/src/api/client.js` — fetch wrapper, token storage (`wanderlens_token`), network-error handling.
- `Frontend/src/api/index.js` — endpoint helpers and mappers (`toDestinationCard`, `toCategory`, `toPlaceCard`, `toPlaceDetail`, `toViewpointCard`, `toTrendingPlace`, `toTripCard`, `imageFor`/`imageList` with local fallback assets so the UI stays intact even before images are seeded).
- `Frontend/src/context/AuthContext.jsx` — auth state, `login`/`register`/`logout`, session restore via `/api/auth/me`.
- `Frontend/src/App.jsx` — wrapped in `AuthProvider`.
- `Frontend/src/components/landingPage/Navbar.jsx`, `Hero.jsx`, `Destinations.jsx`, `Categories.jsx`, `Viewpoints.jsx`, `Trending.jsx` — real API data, same markup.
- `Frontend/src/components/Explore.jsx` — server-side filtering (debounced search, comma-separated category/type filters, rating/sort) with client-side load-more.
- `Frontend/src/components/viewpoints.jsx` — viewpoints page fetched from `/api/viewpoints`; filter chips map `Mountain → Mountains`, `Lake → Nature`, `City → Viewpoints`.
- `Frontend/src/components/DestinationDetails.jsx` — fetches the destination by `:name` plus its places and viewpoints.
- `Frontend/src/components/placedetails.jsx` — fetches the place by `:name`, related places from the same destination, save + add-to-trip.
- `Frontend/src/pages/login.jsx`, `register.jsx`, `Frontend/src/components/profilePage.jsx` — auth-aware forms and profile.

## Notes

- Protected actions (save, add-to-trip, profile) redirect to `/login` when no user is logged in.
- Category names in the seed (`Mountains`, `Historical`, `Nature`, `Beaches`, `Viewpoints`, `Adventure`, `Food`, `Museums`, `Shopping`) intentionally match the landing icons and Explore chips so filters line up with the data.
- The viewpoints page, Explore, and destination/place detail pages fetch up to 100 records and keep filtering/sorting client-side for instant response, matching the original locked behaviour.