import { Users } from '../models/users.models.js';

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

const emailValidation = async (req, res, next) => {
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

export const usersMiddlewares = {
  nameEmailPassFormatValidation,
  emailValidation,
};
