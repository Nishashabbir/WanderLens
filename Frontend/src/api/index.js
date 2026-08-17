import { request } from "./client";
import fallbackImage from "@/assets/hunza.jpg";
import fallbackPlace from "@/assets/travel2.jpg";
import fallbackLake from "@/assets/skardu2.jpg";

const FALLBACK_IMAGES = [fallbackImage, fallbackPlace, fallbackLake];

function isObj(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function catName(category) {
  if (isObj(category) && category.name) return category.name;
  if (typeof category === "string" && category) return category;
  return "";
}

function destName(doc) {
  const dest = isObj(doc?.destination) ? doc.destination : null;
  if (dest?.name) return dest.name;
  if (typeof doc?.destination === "string" && doc.destination) return doc.destination;
  return "";
}

function destLabel(doc) {
  const dest = isObj(doc?.destination) ? doc.destination : null;
  if (dest?.name) return dest.region ? `${dest.name}, ${dest.region}` : dest.name;
  return destName(doc) || "";
}

function placeLocation(place) {
  if (!isObj(place)) return "";
  if (place.location) return place.location;
  return destName(place) || "";
}

function imageFor(images) {
  if (Array.isArray(images) && images.length) return images[0];
  if (typeof images === "string" && images) return images;
  return FALLBACK_IMAGES[0];
}

function imageList(images) {
  const source =
    Array.isArray(images) && images.length
      ? images
      : typeof images === "string" && images
        ? [images]
        : [];
  const list = source.slice(0, 3);
  let i = 0;
  while (list.length < 3) {
    list.push(FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]);
    i += 1;
  }
  return list;
}

function buildQuery(path, params) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) value.forEach((v) => qs.append(key, v));
    else qs.set(key, value);
  });
  const query = qs.toString();
  return query ? `${path}?${query}` : path;
}

export const api = {
  search: (q) => request(`/search?q=${encodeURIComponent(q || "")}`),

  destinations: (params = {}) => request(buildQuery("/destinations", params)),
  destinationByName: (name) => request(`/destinations/name/${encodeURIComponent(name)}`),

  places: (params = {}) => request(buildQuery("/places", params)),
  placeByName: (name) => request(`/places/name/${encodeURIComponent(name)}`),

  viewpoints: (params = {}) => request(buildQuery("/viewpoints", params)),

  categories: () => request("/categories"),

  register: (body) => request("/auth/register", { method: "POST", body }),
  login: (body) => request("/auth/login", { method: "POST", body }),
  me: () => request("/auth/me", { auth: true }),
  logout: () => request("/auth/logout", { method: "POST", auth: true }),

  savedPlaces: () => request("/saved-places", { auth: true }),
  checkSaved: (id) => request(`/saved-places/check/${id}`, { auth: true }),
  savePlace: (itemType, item) =>
    request("/saved-places", { method: "POST", auth: true, body: { itemType, item } }),
  unsavePlace: (id) => request(`/saved-places/${id}`, { method: "DELETE", auth: true }),

  trips: () => request("/trips", { auth: true }),
  tripCreate: (body) => request("/trips", { method: "POST", auth: true, body }),
  tripUpdate: (id, body) => request(`/trips/${id}`, { method: "PUT", auth: true, body }),
  tripDelete: (id) => request(`/trips/${id}`, { method: "DELETE", auth: true }),
};

/* =========================================================
   MAPPERS
========================================================= */

export function toDestinationCard(d) {
  return {
    name: d.name,
    region: d.region || d.country || "",
    places: d.placesCount ?? 0,
    image: imageFor(d.images),
    tag: d.tag || "Featured",
  };
}

export function toCategory(c) {
  return { name: c.name, count: c.placesCount ?? 0 };
}

export function toViewpointCard(v, index = 0) {
  return {
    name: v.name,
    location: destLabel(v),
    rating: Number(v.rating ?? 0),
    reviews: v.reviewCount ?? 0,
    image: imageFor(v.images),
    note: v.description || v.bestTime || "",
    span: index === 0,
  };
}

export function toPlaceCard(p) {
  return {
    id: p._id,
    name: p.name,
    location: placeLocation(p),
    category: catName(p.category) || "Places",
    type: p.type || "Place",
    rating: Number(p.rating ?? 0),
    reviews: p.reviewCount ?? 0,
    image: imageFor(p.images),
    description: p.description || "",
    tag: p.tag || "Popular",
  };
}

export function toTrendingPlace(p) {
  return {
    name: p.name,
    city: placeLocation(p) || catName(p.category),
    category: catName(p.category) || "Places",
    rating: Number(p.rating ?? 0),
    image: imageFor(p.images),
    blurb: p.description || "",
  };
}

export function toViewpoint(v) {
  return {
    id: v._id,
    name: v.name,
    destination: destName(v),
    category: catName(v.category) || "Mountain",
    rating: Number(v.rating ?? 0),
    reviews: v.reviewCount ?? 0,
    bestTime: v.bestTime || "Sunrise",
    elevation: v.elevation || "",
    description: v.description || "",
    image: imageFor(v.images),
    featured: !!v.featured,
  };
}

export function toPlaceDetail(p) {
  const dest = isObj(p.destination) ? p.destination : null;
  return {
    id: p._id,
    name: p.name,
    destination: dest?.name || "",
    region: dest?.region || "",
    category: catName(p.category) || "Place",
    type: p.type || "Place",
    location: p.location || dest?.name || "",
    rating: Number(p.rating ?? 0),
    reviews: p.reviewCount ?? 0,
    images: imageList(p.images),
    description: p.description || "",
    openingHours: p.openingHours || "",
    entryFee: p.entryFee ?? 0,
    bestTime: p.recommendedVisitingTime || "",
    duration: p.estimatedDuration || "",
  };
}

export function toRelatedPlace(p) {
  return {
    name: p.name,
    location: placeLocation(p),
    rating: Number(p.rating ?? 0),
    image: imageFor(p.images),
  };
}

const ACT_ICONS = ["↗", "⌁", "◇", "✦", "◎"];

export function toDestinationDetail(d, places = [], viewpoints = [], nearbyDestinations = []) {
  const destNameValue = d.name || "";
  const avgRating = places.length
    ? (places.reduce((sum, p) => sum + Number(p.rating || 0), 0) / places.length).toFixed(1)
    : "4.8";

  const tags = new Set();
  places.forEach((p) => {
    const name = catName(p.category);
    if (name) tags.add(name);
  });
  (d.categories || []).forEach((c) => {
    const name = catName(c);
    if (name) tags.add(name);
  });
  if (d.region) tags.add(d.region);
  if (tags.size < 3) {
    ["Culture", "Photography"].forEach((t) => tags.add(t));
  }

  const attractions = places.slice(0, 3).map((p) => ({
    name: p.name,
    category: catName(p.category) || p.type || "Place",
    description: p.description || "",
    image: imageFor(p.images),
  }));

  const activitySet = new Set(places.map((p) => catName(p.category)).filter(Boolean));
  const activityTitles = Array.from(activitySet).slice(0, 5);
  const activities = activityTitles.length
    ? activityTitles.map((title, i) => ({ title, icon: ACT_ICONS[i % ACT_ICONS.length] }))
    : [
        { title: "Explore", icon: "↗" },
        { title: "Photography", icon: "◎" },
      ];

  const destViewpoints = viewpoints.slice(0, 3).map((v) => ({
    name: v.name,
    place: destName(v) || destNameValue,
    image: imageFor(v.images),
    time: v.bestTime ? `Best at ${v.bestTime.toLowerCase()}` : "Golden hour",
  }));

  const stayLow = Math.max(2, Math.round(places.length / 8));
  const stayHigh = Math.max(3, Math.round(places.length / 5));

  const mapPins = [
    { top: "35%", left: "42%", label: destNameValue, active: true },
  ];
  places.slice(0, 2).forEach((p, i) => {
    mapPins.push({
      top: i === 0 ? "20%" : "62%",
      left: i === 0 ? "67%" : "25%",
      label: p.name,
      active: false,
    });
  });
  while (mapPins.length < 3) {
    mapPins.push({ top: "62%", left: "25%", label: destNameValue, active: false });
  }

  return {
    name: destNameValue,
    suffix: "Awaits.",
    region: d.region || d.country || "",
    heroImage: imageFor(d.images),
    heroText: d.description || `Discover ${destNameValue} and the places worth travelling for.`,
    stats: [
      { number: String(places.length), label: "places to discover" },
      { number: String(viewpoints.length), label: "viewpoints" },
      { number: avgRating, label: "traveller rating" },
      { number: "Year-round", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A place that",
    overviewTitleAccent: "stays with you.",
    overviewLead:
      d.description ||
      `${destNameValue} is not simply a destination you tick off a list.`,
    overviewBody: `${destNameValue} rewards travellers who take their time — with ${places.length} places and ${viewpoints.length} viewpoints to explore there is always more to find.`,
    tags: Array.from(tags).slice(0, 6),
    attractions,
    activities,
    viewpoints: destViewpoints,
    travelInfo: [
      { icon: "◷", title: "Best time", value: "Year-round" },
      { icon: "⌖", title: "Getting there", value: `Fly or drive to ${destNameValue}` },
      { icon: "↗", title: "Recommended stay", value: `${stayLow} — ${stayHigh} days` },
      { icon: "°", title: "Altitude", value: "Varies by area" },
    ],
    mapPins,
    mapLabel: destNameValue,
    nearby: nearbyDestinations.slice(0, 3).map((nd) => ({
      name: nd.name,
      distance: nd.region ? `${nd.region}` : "Nearby",
      image: imageFor(nd.images),
    })),
  };
}

/* =========================================================
   SAVED ITEMS + TRIPS
========================================================= */

export function toSavedCard(saved) {
  const item = saved.item || {};
  return {
    id: saved._id,
    itemId: item._id,
    itemType: saved.itemType,
    name: item.name,
    location:
      saved.itemType === "Destination"
        ? [item.region, item.country].filter(Boolean).join(", ")
        : placeLocation(item),
    category:
      saved.itemType === "Destination"
        ? "Destination"
        : catName(item.category) || item.type || "Place",
    image: imageFor(item.images),
  };
}

export function toTripPlace(p) {
  return {
    id: p._id,
    name: p.name,
    location: placeLocation(p),
    category: catName(p.category) || "Place",
    rating: Number(p.rating ?? 0),
    image: imageFor(p.images),
  };
}

export function toTrip(t) {
  const daysMap = {};
  (t.items || []).forEach((item) => {
    const dayNum = item.day || 1;
    if (!daysMap[dayNum]) {
      daysMap[dayNum] = { id: `day-${dayNum}`, title: `Day ${dayNum}`, places: [] };
    }
    if (item.place) daysMap[dayNum].places.push(toTripPlace(item.place));
  });

  const days = Object.keys(daysMap)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => daysMap[key]);

  if (days.length === 0) days.push({ id: "day-1", title: "Day 1", places: [] });

  return {
    id: t._id,
    name: t.name,
    destination: destName(t) || "",
    startDate: t.startDate || "",
    endDate: t.endDate || "",
    createdAt: t.createdAt,
    days,
  };
}

export function tripToPayload(trip) {
  const items = [];
  (trip.days || []).forEach((day, dayIndex) => {
    (day.places || []).forEach((place, orderIndex) => {
      items.push({ day: dayIndex + 1, order: orderIndex, place: place.id });
    });
  });
  return {
    name: trip.name,
    startDate: trip.startDate || null,
    endDate: trip.endDate || null,
    items,
  };
}