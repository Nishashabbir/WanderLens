import { SavedPlace } from '../models/Activity.js';
import { ok, fail } from '../utils/api.js';

export async function save(req, res) {
  const { itemType, item } = req.body;
  if (!['Place', 'Destination', 'Viewpoint'].includes(itemType) || !item) {
    return fail(res, 'itemType and item are required');
  }
  try {
    return ok(res, await SavedPlace.create({ user: req.user._id, itemType, item }), 'Saved', 201);
  } catch (e) {
    if (e.code === 11000) return fail(res, 'Item already saved', 409);
    throw e;
  }
}

export async function unsave(req, res) {
  const removed = await SavedPlace.findOneAndDelete({
    user: req.user._id,
    item: req.params.placeId,
  });
  if (!removed) return fail(res, 'Saved item not found', 404);
  return ok(res, null, 'Removed');
}

export async function saved(req, res) {
  const items = await SavedPlace.find({ user: req.user._id }).populate('item');
  return ok(res, items);
}

export async function check(req, res) {
  const exists = await SavedPlace.exists({ user: req.user._id, item: req.params.placeId });
  return ok(res, { saved: !!exists });
}