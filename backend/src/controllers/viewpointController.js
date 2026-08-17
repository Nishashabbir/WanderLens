import { Viewpoint } from '../models/Content.js';
import { crud } from './crudController.js';

const viewpointCrud = crud(Viewpoint, ['destination', 'category', 'nearbyPlaces']);

export const viewpointController = {
  list: viewpointCrud.list,
  get: viewpointCrud.get,
  getByName: viewpointCrud.getByName,
  create: viewpointCrud.create,
  update: viewpointCrud.update,
  remove: viewpointCrud.remove,
};

export default viewpointController;