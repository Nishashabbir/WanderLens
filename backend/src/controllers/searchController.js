import { Destination, Place, Viewpoint } from '../models/Content.js';
import { ok } from '../utils/api.js';

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function search(req, res) {
  const query = (req.query.q || '').trim();

  if (!query) {
    return ok(res, { destinations: [], places: [], viewpoints: [] }, 'Search results');
  }

  const pattern = new RegExp(escapeRegExp(query), 'i');

  const [destinations, places, viewpoints] = await Promise.all([
    Destination.find({ $or: [{ name: pattern }, { city: pattern }, { region: pattern }] }).limit(20),
    Place.find({ $or: [{ name: pattern }, { description: pattern }, { location: pattern }] }).limit(20),
    Viewpoint.find({ $or: [{ name: pattern }, { description: pattern }] }).limit(20),
  ]);

  return ok(res, { destinations, places, viewpoints }, 'Search results');
}