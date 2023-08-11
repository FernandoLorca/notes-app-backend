import { Router } from 'express';

import { notesMiddlewares } from '../middleware/notes.middlewares.js';
import { notesController } from '../controller/notes.controller.js';

const notesRouter = Router();

notesRouter.get('/', notesController.getNotes);
notesRouter.get(
  '/:id',
  notesMiddlewares.noteIdVerification,
  notesController.getNote
);
notesRouter.post(
  '/',
  notesMiddlewares.hasContentToCreate,
  notesController.createNote
);
notesRouter.put(
  '/:id',
  notesMiddlewares.hasContentToUpdate,
  notesController.updateNote
);
notesRouter.delete(
  '/:id',
  notesMiddlewares.noteIdVerification,
  notesController.deleteNote
);

export default notesRouter;
