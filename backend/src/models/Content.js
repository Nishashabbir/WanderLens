import mongoose from 'mongoose';

const imageField = [String];

export const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, default: 'Pakistan' },
    region: String,
    city: String,
    description: String,
    tag: String,
    images: imageField,
    coordinates: { lat: Number, lng: Number },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    featured: { type: Boolean, default: false },
    popularity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

destinationSchema.index({ name: 'text', country: 'text', region: 'text', city: 'text' });

export const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    type: { type: String, enum: ['Place', 'Destination', 'Viewpoint', 'Experience'], default: 'Place' },
    tag: String,
    images: imageField,
    location: String,
    coordinates: { lat: Number, lng: Number },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    openingHours: String,
    entryFee: { type: Number, min: 0, default: 0 },
    recommendedVisitingTime: String,
    estimatedDuration: String,
    contactInformation: String,
    popularity: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

placeSchema.index({ name: 'text', description: 'text', location: 'text' });

export const viewpointSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    description: String,
    images: imageField,
    coordinates: { lat: Number, lng: Number },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    visitingInformation: String,
    bestTime: String,
    elevation: String,
    featured: { type: Boolean, default: false },
    popularity: { type: Number, default: 0 },
    nearbyPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  },
  { timestamps: true }
);

viewpointSchema.index({ name: 'text', description: 'text' });

export const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

categorySchema.index({ name: 'text' });

export const Destination = mongoose.model('Destination', destinationSchema);
export const Place = mongoose.model('Place', placeSchema);
export const Viewpoint = mongoose.model('Viewpoint', viewpointSchema);
export const Category = mongoose.model('Category', categorySchema);