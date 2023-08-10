// app.js encargado de configurar express
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import usersRouter from './users/routes/users.routes.js';
import { sequelize } from './database/connection.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', usersRouter);

export default app;
