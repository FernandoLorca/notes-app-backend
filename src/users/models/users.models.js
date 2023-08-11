import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';
import { Notes } from '../../notes/models/notes.models.js';

export const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Notes, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  sourceKey: 'id',
});

Notes.belongsTo(Users, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  targetKey: 'id',
});
