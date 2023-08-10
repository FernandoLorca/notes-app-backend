import { Router } from 'express';

import { notesController } from '../controller/notes.controller.js';

const notesRouter = Router();

notesRouter.get('/', notesController.getNotes);
notesRouter.get('/:id', notesController.getNote);
notesRouter.post('/', notesController.createNote);
notesRouter.put('/:id', notesController.updateNote);
notesRouter.delete('/:id', notesController.deleteNote);

export default notesRouter;
