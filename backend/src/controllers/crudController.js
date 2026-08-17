import { pagination } from '../utils/pagination.js';
import { ok, fail } from '../utils/api.js';

function nameMatch(name) {
  return { name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } };
}

export function crud(Model, { populate = [] } = {}) {
  return {
    list: async (req, res) => {
      const { page, limit, skip } = pagination(req.query);
      const query = {};

      if (req.query.search) {
        query.$text = { $search: req.query.search };
      }

      // Reference filters. The frontend sends comma-separated ids when several
      // categories or types are selected at once.
      if (req.query.destination) query.destination = req.query.destination;
      if (req.query.category) {
        const categories = req.query.category.split(',');
        query.category = categories.length > 1 ? { $in: categories } : categories[0];
      }

      if (req.query.type) {
        const types = req.query.type.split(',');
        query.type = types.length > 1 ? { $in: types } : types[0];
      }

      if (req.query.featured != null) query.featured = req.query.featured === 'true';

      if (req.query.rating) query.rating = { $gte: Number(req.query.rating) };

      if (req.query.minPrice) query.entryFee = { $gte: Number(req.query.minPrice) };
      if (req.query.maxPrice) {
        query.entryFee = { ...(query.entryFee || {}), $lte: Number(req.query.maxPrice) };
      }

      let sort = { createdAt: -1 };
      if (req.query.sort === 'rating') sort = { rating: -1 };
      if (req.query.sort === 'popularity') sort = { popularity: -1 };
      if (req.query.sort === 'az') sort = { name: 1 };

      const [items, total] = await Promise.all([
        Model.find(query)
          .populate(populate)
          .sort(sort)
          .skip(skip)
          .limit(limit),
        Model.countDocuments(query),
      ]);

      return ok(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    },

    get: async (req, res) => {
      const item = await Model.findById(req.params.id).populate(populate);
      if (!item) return fail(res, 'Resource not found', 404);
      return ok(res, item);
    },

    // Look up a single document by its name (used by frontend routes like /destination/:name).
    getByName: async (req, res) => {
      const item = await Model.findOne(nameMatch(req.params.name)).populate(populate);
      if (!item) return fail(res, 'Resource not found', 404);
      return ok(res, item);
    },

    create: async (req, res) => {
      const item = await Model.create(req.body);
      return ok(res, item, 'Created', 201);
    },

    update: async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return fail(res, 'Resource not found', 404);
      return ok(res, item, 'Updated');
    },

    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return fail(res, 'Resource not found', 404);
      return ok(res, null, 'Deleted');
    },
  };
}