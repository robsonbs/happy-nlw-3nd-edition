import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);
routes.use(function show(req: Request, res: Response, next: NextFunction) {
  return next();
});
routes
  .get('/orphanages', OrphanagesController.index)
  .get('/orphanages/:id', OrphanagesController.show)
  .post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.post('/users', UsersController.create);

routes.post('/sessions', UsersController.login);

export default routes;
