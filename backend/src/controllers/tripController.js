import { Trip } from '../models/Activity.js';
import { ok, fail } from '../utils/api.js';

const tripPopulate = ['destination', 'items.place'];

export async function trips(req, res) {
  const items = await Trip.find({ user: req.user._id }).populate(tripPopulate);
  return ok(res, items);
}

export async function tripGet(req, res) {
  const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id }).populate(
    tripPopulate
  );
  if (!trip) return fail(res, 'Trip not found', 404);
  return ok(res, trip);
}

export async function tripCreate(req, res) {
  const trip = await Trip.create({ ...req.body, user: req.user._id });
  return ok(res, trip, 'Trip created', 201);
}

export async function tripUpdate(req, res) {
  const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!trip) return fail(res, 'Trip not found', 404);
  return ok(res, trip, 'Trip updated');
}

export async function tripDelete(req, res) {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!trip) return fail(res, 'Trip not found', 404);
  return ok(res, null, 'Trip deleted');
}