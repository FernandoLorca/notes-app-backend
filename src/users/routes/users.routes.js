import { Router } from 'express';

import { usersMiddlewares } from '../middlewares/users.middlewares.js';
import { usersController } from '../controller/users.controller.js';

const usersRouter = Router();

usersRouter.get(
  '/auth',
  usersMiddlewares.authValidation,
  usersMiddlewares.tokenValidation,
  usersController.setUserByToken
);

usersRouter.post(
  '/login',
  usersMiddlewares.emailPassValidation,
  usersController.getUser
);

usersRouter.post(
  '/register',
  usersMiddlewares.nameEmailPassFormatValidation,
  usersMiddlewares.emailRepeatValidation,
  usersController.createUser
);

usersRouter.get(
  '/:name/notes',
  usersMiddlewares.tokenValidation,
  usersController.getUserNotes
);

usersRouter.get(
  '/:name/notes/:id',
  usersMiddlewares.tokenValidation,
  usersController.getUserNote
);

usersRouter.post(
  '/:name/notes',
  usersMiddlewares.tokenValidation,
  usersController.createUserNote
);

usersRouter.put(
  '/:name/notes/:id',
  usersMiddlewares.tokenValidation,
  usersController.updateUserNote
);

usersRouter.delete(
  '/:name/notes/:id',
  usersMiddlewares.tokenValidation,
  usersController.deleteUserNote
);
export default usersRouter;
