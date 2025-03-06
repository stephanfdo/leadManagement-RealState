'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Lead.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.FLOAT,
    budget: DataTypes.FLOAT,
    propertyType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lead',
  });

  return Lead;
};