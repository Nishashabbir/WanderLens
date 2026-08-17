import { Review } from '../models/Activity.js';
import { ok, fail } from '../utils/api.js';

export async function reviewCreate(req, res) {
  const review = await Review.create({ ...req.body, user: req.user._id });
  return ok(res, review, 'Review created', 201);
}

export async function reviewList(req, res) {
  const filter = req.query.place ? { place: req.query.place } : { status: 'published' };
  const reviews = await Review.find(filter)
    .populate('user', 'name profile')
    .populate('place');
  return ok(res, reviews);
}

export async function reviewGet(req, res) {
  const review = await Review.findById(req.params.id).populate('user', 'name').populate('place');
  if (!review) return fail(res, 'Review not found', 404);
  return ok(res, review);
}

export async function reviewUpdate(req, res) {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!review) return fail(res, 'Review not found or not owned', 404);
  return ok(res, review, 'Review updated');
}

export async function reviewDelete(req, res) {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id };
  const review = await Review.findOneAndDelete(filter);
  if (!review) return fail(res, 'Review not found or not authorized', 404);
  return ok(res, null, 'Review deleted');
}