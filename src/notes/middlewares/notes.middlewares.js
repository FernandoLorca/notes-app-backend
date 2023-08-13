import jwt from 'jsonwebtoken';

import { errorStatusHandler } from '../../helpers/errorHandler.js';
import { Notes } from '../models/notes.models.js';

const tokenValidation = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader)
    return res.status(401).json({
      ok: false,
      status: 401,
      message: 'Token is required',
    });

  const token = bearerHeader.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload)
    return res.status(401).json({
      ok: false,
      status: 401,
      message: 'Invalid token',
    });

  req.user = {
    id: payload.id,
    email: payload.email,
  };

  next();
};

const noteIdVerification = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json(errorStatusHandler(400));

  try {
    const note = await Notes.findByPk(id);

    if (!note) return res.status(404).json(errorStatusHandler(404));

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const hasContentToCreate = (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  if (!title || !content || !id)
    return res.status(400).json(errorStatusHandler(400));

  req.note = {
    title,
    content,
    userId: id,
  };

  next();
};

const hasContentToUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id) return res.status(400).json(errorStatusHandler(400));

  if (!title || !content) return res.status(400).json(errorStatusHandler(400));

  try {
    const note = await Notes.findByPk(id);

    if (!note) return res.status(404).json(errorStatusHandler(404));

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

export const notesMiddlewares = {
  tokenValidation,
  noteIdVerification,
  hasContentToCreate,
  hasContentToUpdate,
};
