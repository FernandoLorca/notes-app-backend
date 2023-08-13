import { Router } from 'express';

import { usersMiddlewares } from '../middlewares/users.middlewares.js';
import { usersController } from '../controller/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);

usersRouter.get(
  '/login',
  usersMiddlewares.emailPassValidation,
  usersController.getUser
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
  '/register',
  usersMiddlewares.nameEmailPassFormatValidation,
  usersMiddlewares.emailRepeatValidation,
  usersController.createUser
);

usersRouter.put('/:id', usersController.updateUser);

usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter;
