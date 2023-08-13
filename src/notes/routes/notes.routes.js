import { Router } from 'express';

import { notesMiddlewares } from '../middlewares/notes.middlewares.js';
import { notesController } from '../controller/notes.controller.js';

const notesRouter = Router();

notesRouter.post(
  '/',
  notesMiddlewares.tokenValidation,
  notesMiddlewares.hasContentToCreate,
  notesController.createNote
);
notesRouter.put(
  '/:id',
  notesMiddlewares.tokenValidation,
  notesMiddlewares.hasContentToUpdate,
  notesController.updateNote
);
notesRouter.delete(
  '/:id',
  notesMiddlewares.tokenValidation,
  notesMiddlewares.noteIdVerification,
  notesController.deleteNote
);

export default notesRouter;
