import express from 'express';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola');
});

app.get('/notes', async (req, res) => {
  try {
    const data = await fs.readFile('src/notes.json');
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (readError) {
    console.error(`There was a problem reading the file: ${readError}`);
    res.status(500).json({
      ok: false,
      error: readError,
      msg: 'There was a problem reading the file',
    });
  }
});

app.post('/notes', async (req, res) => {
  const { title, description } = req.body;

  try {
    const data = await fs.readFile('src/notes.json', 'utf-8');
    const notes = JSON.parse(data);

    const newNote = {
      id: nanoid(),
      title,
      description,
    };

    if (title !== '' && description !== '') {
      notes.push(newNote);
    } else {
      console.error('Title and description are required to add a note');
      return res.status(400).json({
        ok: false,
        error: 'Title and description are required to add a note',
      });
    }

    try {
      await fs.writeFile('src/notes.json', JSON.stringify(notes));
      res.status(201).json({
        ok: true,
        msg: 'The note was successfully created',
      });
    } catch (writeError) {
      console.error(`There was a problem writing the file: ${writeError}`);
      res.status(500).json({
        ok: false,
        error: writeError,
        msg: 'There was a problem writing the file',
      });
    }
  } catch (readError) {
    console.error(`There was a problem reading the file: ${readError}`);
    res.status(500).json({
      ok: false,
      error: readError,
      msg: 'There was a problem reading the file',
    });
  }
});

app.listen(PORT, console.log('Servidor corriendo en puerto:' + PORT));
