import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();
const upload = multer(uploadConfig);
routes.use(function show(req: Request, res: Response, next: NextFunction) {
  return next();
});
routes
  .get('/orphanages', OrphanagesController.index)
  .get('/orphanages/:id', OrphanagesController.show);

routes.post('/users', UsersController.create);

routes
  .post('/sessions', UsersController.login)
  .post('/forgot-password', UsersController.forgotPassword);
routes.use(ensureAuthenticated);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;
