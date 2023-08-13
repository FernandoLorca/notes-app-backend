import jwt from 'jsonwebtoken';

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

  if (!id)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Id is required',
    });

  try {
    const note = await Notes.findByPk(id);

    if (!note)
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Note not found',
      });

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

  if (!title || !content)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Title and content are required',
    });

  req.note = {
    title,
    content,
    userId: id,
  };

  next();
};

const hasContentToUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content || !id)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Title, content and user id are required',
    });

  try {
    const note = await Notes.findByPk(id);

    if (!note)
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Note not found',
      });

    req.note = {
      id,
      title,
      content,
    };

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
