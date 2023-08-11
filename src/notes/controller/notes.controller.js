import { Notes } from '../models/notes.models.js';

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.findAll();

    if (notes.length === 0)
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Notes not found',
      });

    res.json({
      ok: true,
      status: 200,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Notes.findByPk(id);

    if (!note) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Note not found',
      });
    }

    res.json({
      ok: true,
      status: 200,
      note,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const createNote = async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required fields',
    });

  try {
    const note = await Notes.create({ title, content, userId });
    res.status(201).json({
      ok: true,
      status: 201,
      note,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
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
    note.title = title;
    note.content = content;
    await note.save();
    res.json({
      ok: true,
      status: 200,
      note,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Missing required id field',
    });

  try {
    await Notes.destroy({
      where: { id },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

export const notesController = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
