import * as dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { errorStatusHandler } from '../../helpers/errorHandler.js';
import { Users } from '../models/users.models.js';
import { Notes } from '../../notes/models/notes.models.js';

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      users,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const setUserByToken = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Token is valid',
      user: {
        id: user[0].dataValues.id,
        name: user[0].dataValues.name,
        email: user[0].dataValues.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      user: {
        id: user[0].dataValues.id,
        name: user[0].dataValues.name,
        email: user[0].dataValues.email,
        token: jwt.sign(
          {
            id: user[0].dataValues.id,
            email: user[0].dataValues.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '10h',
          }
        ),
        createdAt: user[0].dataValues.createdAt,
        updatedAt: user[0].dataValues.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const getUserNotes = async (req, res) => {
  const { email } = req.user;
  const { name } = req.params;

  try {
    const users = await Users.findAll({
      where: {
        email,
      },
    });

    if (users[0].dataValues.name.toLowerCase() !== name.toLowerCase())
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Unauthorized',
      });

    const id = users[0].dataValues.id;
    const notes = await Notes.findAll({
      where: {
        userId: id,
      },
    });

    console.log(notes);

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

const getUserNote = async (req, res) => {
  const { email } = req.user;
  const { name, id } = req.params;

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    if (user[0].dataValues.name.toLowerCase() !== name.toLowerCase())
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Unauthorized',
      });

    const note = await Notes.findOne({
      where: {
        id,
        userId: user[0].dataValues.id,
      },
    });

    if (!note)
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Note not found',
      });

    res.status(200).json({
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

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await Users.findAll({
      where: {
        email: newUser.dataValues.email,
      },
    });

    res.status(201).json({
      ok: true,
      status: 201,
      user: {
        id: user[0].dataValues.id,
        name: user[0].dataValues.name,
        email: user[0].dataValues.email,
        token: jwt.sign(
          {
            id: user[0].dataValues.id,
            email: user[0].dataValues.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '10h',
          }
        ),
        createdAt: user[0].dataValues.createdAt,
        updatedAt: user[0].dataValues.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, newPassword } = req.body;
  const { email } = req.user;

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.name = name;
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      ok: true,
      status: 200,
      user,
    });
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
  const user = res.user;

  if (id !== user[0].dataValues.id.toString())
    return res.status(401).json({
      ok: false,
      status: 401,
      message: 'Unauthorized',
    });
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
  setUserByToken,
  getUserNotes,
  getUserNote,
  createUser,
  updateUser,
  deleteUser,
};
