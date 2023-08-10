import { Users } from '../models/users.models.js';

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

export const usersController = {
  getUsers,
  createUser,
};
