const getUsers = (req, res) => {
  res.send('Getting users');
};

const createUser = (req, res) => {
  console.log(req.body);
  res.send('Creating users');
};

export const usersController = {
  getUsers,
  createUser,
};
