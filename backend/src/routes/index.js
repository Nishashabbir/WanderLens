import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me, logout } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import destinationController from '../controllers/destinationController.js';
import placeController from '../controllers/placeController.js';
import viewpointController from '../controllers/viewpointController.js';
import categoryController from '../controllers/categoryController.js';
import { search } from '../controllers/searchController.js';
import * as savedPlaces from '../controllers/savedPlaceController.js';
import * as trips from '../controllers/tripController.js';
import * as reviews from '../controllers/reviewController.js';
import * as admin from '../controllers/adminController.js';

const router = Router();

// Auth
const auth = Router();
auth.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);
auth.post('/login', login);
auth.post('/logout', protect, logout);
auth.get('/me', protect, me);
router.use('/auth', auth);

// Generic public resource routes. Name lookups are registered before :id so the
// frontend routes like /destination/:name keep working with the existing UI.
function resource(path, controller) {
  router.get(path, controller.list);
  router.get(`${path}/name/:name`, controller.getByName);
  router.get(`${path}/:id`, controller.get);
  router.post(path, protect, adminOnly, controller.create);
  router.put(`${path}/:id`, protect, adminOnly, controller.update);
  router.delete(`${path}/:id`, protect, adminOnly, controller.remove);
}

resource('/destinations', destinationController);
resource('/places', placeController);
resource('/viewpoints', viewpointController);
resource('/categories', categoryController);

// Global search
router.get('/search', search);

// Saved places
const savedPlacesRouter = Router();
savedPlacesRouter.use(protect);
savedPlacesRouter.post('/', savedPlaces.save);
savedPlacesRouter.delete('/:placeId', savedPlaces.unsave);
savedPlacesRouter.get('/', savedPlaces.saved);
savedPlacesRouter.get('/check/:placeId', savedPlaces.check);
router.use('/saved-places', savedPlacesRouter);

// Trips
const tripsRouter = Router();
tripsRouter.use(protect);
tripsRouter.post('/', trips.tripCreate);
tripsRouter.get('/', trips.trips);
tripsRouter.get('/:id', trips.tripGet);
tripsRouter.put('/:id', trips.tripUpdate);
tripsRouter.delete('/:id', trips.tripDelete);
router.use('/trips', tripsRouter);

// Reviews
const reviewsRouter = Router();
reviewsRouter.get('/', reviews.reviewList);
reviewsRouter.get('/:id', reviews.reviewGet);
reviewsRouter.post('/', protect, reviews.reviewCreate);
reviewsRouter.put('/:id', protect, reviews.reviewUpdate);
reviewsRouter.delete('/:id', protect, reviews.reviewDelete);
router.use('/reviews', reviewsRouter);

// Admin (users)
const adminRouter = Router();
adminRouter.use(protect, adminOnly);
adminRouter.get('/users', admin.users);
adminRouter.put('/users/:id', admin.userUpdate);
adminRouter.delete('/users/:id', admin.userDelete);
router.use('/admin', adminRouter);

export default router;