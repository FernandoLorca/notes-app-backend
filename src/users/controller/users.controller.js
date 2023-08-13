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

  try {
    const users = await Users.findAll({
      where: {
        email,
      },
    });
    const id = users[0].dataValues.id;

    const notes = await Notes.findAll({
      where: {
        userId: id,
      },
    });

    if (notes.length === 0)
      return res.status(404).json(errorStatusHandler(404));

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
  getUserNotes,
  createUser,
  updateUser,
  deleteUser,
};
