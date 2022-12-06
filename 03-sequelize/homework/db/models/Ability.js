const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name :{
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeUnique'
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'compositeUnique',
      validate: {
        min: 10.0,
        max: 250.0
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
      }
    }
  })
}


// * __name__*: string
// * __description__: text
// * __mana_cost__*: float
