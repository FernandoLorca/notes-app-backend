import * as dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { Users } from '../models/users.models.js';

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
    email: payload.email,
  };

  next();
};

const nameEmailPassFormatValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Name, email and password are required',
    });

  if (name.length < 4 || name.length > 20)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Name must be between 4 and 20 characters',
    });

  const validateName = name => {
    const nameRegex = /^[A-Za-z]+$/;

    if (nameRegex.test(name)) {
      return true;
    } else {
      return false;
    }
  };

  if (!validateName(name))
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Name must contain only letters and no spaces',
    });

  const emailFormatValidation = validateEmail => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(validateEmail);
  };

  if (!emailFormatValidation(email))
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });

  if (password.length < 8 || password.length > 32)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 8 and 32 characters',
    });

  next();
};

const emailRepeatValidation = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    if (user.length > 0 && user[0].dataValues.email === email) {
      return res.status(409).json({
        ok: false,
        status: 409,
        message: 'Email already exists',
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const emailPassValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and password are required',
    });

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    if (user.length === 0)
      return res.status(404).json({
        ok: false,
        status: 500,
        message: 'User not found',
      });

    const passwordVerification = await bcrypt.compare(
      password,
      user[0].dataValues.password
    );

    if (!passwordVerification)
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Invalid password',
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

const hasContentToUpdateUser = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password)
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Name and password are required',
    });

  next();
};

const userRemoveValidation = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await Users.findAll({
      where: {
        email,
      },
    });

    if (user.length === 0)
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });

    res.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

export const usersMiddlewares = {
  nameEmailPassFormatValidation,
  emailRepeatValidation,
  emailPassValidation,
  tokenValidation,
  hasContentToUpdateUser,
  userRemoveValidation,
};
