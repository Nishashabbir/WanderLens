import { Category, Place } from '../models/Content.js';
import { crud } from './crudController.js';
import { ok } from '../utils/api.js';

const base = crud(Category);

async function list(req, res) {
  const categories = await Category.find().sort({ name: 1 });
  const ids = categories.map((c) => c._id);

  const counts = await Place.aggregate([
    { $match: { category: { $in: ids } } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

  const result = categories.map((category) => ({
    ...category.toObject(),
    placesCount: countMap.get(String(category._id)) || 0,
  }));

  return ok(res, result);
}

export const categoryController = {
  list,
  get: base.get,
  getByName: base.getByName,
  create: base.create,
  update: base.update,
  remove: base.remove,
};

export default categoryController;