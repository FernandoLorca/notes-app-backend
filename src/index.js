// index.js encargado de arrancar la aplicación
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { sequelize } from './database/connection.js';
import './users/models/users.models.js';
import './notes/models/notes.models.js';

const PORT = process.env.SERVER_PORT || 3000;
const main = async () => {
  try {
    // Para probar la conexión a la base de datos:
    // await sequelize.authenticate();
    // console.log('Database connection OK!');
    await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};
main();
