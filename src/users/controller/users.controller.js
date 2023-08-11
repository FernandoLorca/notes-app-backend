import { Users } from '../models/users.models.js';
import { Notes } from '../../notes/models/notes.models.js';

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user)
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const getUserTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const notes = await Notes.findAll({
      where: {
        userId: id,
      },
    });

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

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Con este metodo se crea un nuevo usuario en la base de datos
    // Esto representa el objeto de la fila que ha sido guardado en la tabla Users
    const newUser = await Users.create({
      name,
      email,
      password,
    });

    res.send(newUser);
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const user = await Users.findByPk(id);
    user.name = name;
    user.password = password;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Users.destroy({
      where: {
        id,
      },
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

export const usersController = {
  getUsers,
  getUser,
  getUserTasks,
  createUser,
  updateUser,
  deleteUser,
};
