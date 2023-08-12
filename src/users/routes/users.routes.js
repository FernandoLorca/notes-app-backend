import { Router } from 'express';

import { usersMiddlewares } from '../middlewares/users.middlewares.js';
import { usersController } from '../controller/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/login', usersController.getUser);
usersRouter.get('/:id/notes', usersController.getUserTasks);
usersRouter.post(
  '/register',
  usersMiddlewares.nameEmailPassFormatValidation,
  usersMiddlewares.emailValidation,
  usersController.createUser
);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter;
