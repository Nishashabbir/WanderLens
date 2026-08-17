import { Destination, Place, Viewpoint } from '../models/Content.js';
import { pagination } from '../utils/pagination.js';
import { crud } from './crudController.js';
import { ok } from '../utils/api.js';

const base = crud(Destination, ['categories']);

async function list(req, res) {
  const { page, limit, skip } = pagination(req.query);
  const query = {};

  if (req.query.search) query.$text = { $search: req.query.search };
  if (req.query.featured != null) query.featured = req.query.featured === 'true';

  let sort = { createdAt: -1 };
  if (req.query.popular === 'true' || req.query.sort === 'popularity') sort = { popularity: -1 };

  const items = await Destination.find(query)
    .populate('categories')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const ids = items.map((item) => item._id);
  const [places, viewpoints] = await Promise.all([
    Place.aggregate([
      { $match: { destination: { $in: ids } } },
      { $group: { _id: '$destination', count: { $sum: 1 } } },
    ]),
    Viewpoint.aggregate([
      { $match: { destination: { $in: ids } } },
      { $group: { _id: '$destination', count: { $sum: 1 } } },
    ]),
  ]);

  const placeCount = new Map(places.map((c) => [String(c._id), c.count]));
  const viewpointCount = new Map(viewpoints.map((c) => [String(c._id), c.count]));

  const result = items.map((item) => ({
    ...item.toObject(),
    placesCount: placeCount.get(String(item._id)) || 0,
    viewpointsCount: viewpointCount.get(String(item._id)) || 0,
  }));

  const total = await Destination.countDocuments(query);
  return ok(res, { items: result, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export const destinationController = {
  list,
  get: base.get,
  getByName: base.getByName,
  create: base.create,
  update: base.update,
  remove: base.remove,
};

export default destinationController;