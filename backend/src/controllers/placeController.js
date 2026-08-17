import { Place } from '../models/Content.js';
import { crud } from './crudController.js';

const placeCrud = crud(Place, ['destination', 'category']);

export const placeController = {
  list: placeCrud.list,
  get: placeCrud.get,
  getByName: placeCrud.getByName,
  create: placeCrud.create,
  update: placeCrud.update,
  remove: placeCrud.remove,
};

export default placeController;