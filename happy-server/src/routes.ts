import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();

routes
  .get('/orphanages', OrphanagesController.index)
  .get('/orphanages/:id', OrphanagesController.show)
  .post('/orphanages', OrphanagesController.create)

export default routes;