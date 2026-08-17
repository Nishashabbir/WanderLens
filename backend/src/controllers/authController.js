import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/token.js';
import { ok, fail } from '../utils/api.js';

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 'Validation failed', 400, errors.array().map((e) => e.msg));
  }

  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    return fail(res, 'Email is already registered', 409);
  }

  const user = await User.create({ name, email, password });
  return ok(res, { user, token: generateToken(user) }, 'Registration successful', 201);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password || ''))) {
    return fail(res, 'Invalid email or password', 401);
  }

  return ok(res, { user: user.toJSON(), token: generateToken(user) }, 'Login successful');
}

export async function me(req, res) {
  return ok(res, { user: req.user });
}

export async function logout(req, res) {
  return ok(res, null, 'Logged out successfully');
}