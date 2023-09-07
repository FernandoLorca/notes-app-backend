import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/connection.js';

export const Notes = sequelize.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
