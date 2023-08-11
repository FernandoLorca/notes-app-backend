import { Notes } from '../models/notes.models.js';

const noteIdVerification = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required id field',
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
  const { title, content, userId } = req.body;

  if (!title || !content || !userId)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required fields',
    });

  next();
};

const hasContentToUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required id field',
    });

  if (!title || !content)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required title or content field',
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

export const notesMiddlewares = {
  noteIdVerification,
  hasContentToCreate,
  hasContentToUpdate,
};
