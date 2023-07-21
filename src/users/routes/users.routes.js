import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/register', (req, res) => {
  res.send('Hola register');
});

export default usersRouter;
