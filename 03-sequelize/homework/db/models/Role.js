const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING
    }

  })
}