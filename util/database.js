const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-project', 'root', 'argameshi12', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;