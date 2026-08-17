# Frontend Changes Made

The frontend was previously locked with inline mock data and no API client. As part of this integration the frontend was connected to the backend while keeping the UI visually identical.

Summary of what changed on the frontend side:

- Added `Frontend/.env` (`VITE_API_URL=http://localhost:5000/api`) and `.env.example`.
- Added `Frontend/src/api/client.js` (fetch wrapper + JWT) and `Frontend/src/api/index.js` (endpoint helpers + data mappers with local image fallbacks).
- Added `Frontend/src/context/AuthContext.jsx` and wrapped the app in `App.jsx`.
- Replaced mock data sources with API calls in: landing page (Navbar, Hero, Destinations, Categories, Viewpoints, Trending), Explore, viewpoints page, DestinationDetails, placedetails, login, register, and profile.
- No Tailwind classes, layouts, or page structure were altered; only the data sources were swapped.

See `FRONTEND_INTEGRATION.md` for the full endpoint map and the list of changed files.