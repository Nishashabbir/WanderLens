import User from '../models/User.js';
import { ok, fail } from '../utils/api.js';

export async function users(req, res) {
  const list = await User.find().select('-password').sort({ createdAt: -1 });
  return ok(res, list);
}

export async function userUpdate(req, res) {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      role: req.body.role,
      profile: req.body.profile,
      preferences: req.body.preferences,
    },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) return fail(res, 'User not found', 404);
  return ok(res, user, 'User updated');
}

export async function userDelete(req, res) {
  if (req.params.id === req.user._id.toString()) {
    return fail(res, 'Cannot delete your own admin account', 400);
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return fail(res, 'User not found', 404);
  return ok(res, null, 'User deleted');
}