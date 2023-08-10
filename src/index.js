// index.js encargado de arrancar la aplicación
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { sequelize } from './database/connection.js';

const PORT = process.env.SERVER_PORT || 3000;
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};
main();
