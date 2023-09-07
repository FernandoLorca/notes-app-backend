// index.js encargado de arrancar la aplicación
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { sequelize } from './database/connection.js';

// Importamos los esquemas creados en los models y se llaman en el momento en que se estan configurando para que sequelize valla creando las tablas en la base de datos. Posteriormente es posible eliminar estas lineas.
// import './users/models/users.models.js';
// import './notes/models/notes.models.js';

const PORT = process.env.SERVER_PORT || 3000;
const main = async () => {
  try {
    // Para probar la conexión a la base de datos:
    // await sequelize.authenticate();
    // console.log('Database connection OK!');

    // Para crear las tablas en la base de datos:
    // El force: true hace una eliminación de las tablas y las vuelve a crear, si no se coloca, solo las crea si no existen. Se utiliza al momento de configurar las tablas.
    // await sequelize.sync({ alter: true });

    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};
main();
