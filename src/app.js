// app.js encargado de configurar express
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import usersRouter from './users/routes/users.routes.js';
import notesRouter from './notes/routes/notes.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

export default app;
