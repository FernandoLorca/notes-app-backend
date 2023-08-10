import { Router } from 'express';

import { usersController } from '../controller/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/', (req, res) => {});
usersRouter.delete('/:id', (req, res) => {});
usersRouter.get('/:id', (req, res) => {});

export default usersRouter;
