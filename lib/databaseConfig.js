const { Sequelize} = require('sequelize');

// Create a Sequelize instance and connect using mysql2
const sequelize = new Sequelize(process.env.databaseName, process.env.databaseUsername, process.env.databasePassword,{
    host: process.env.databaseHost,
    port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: process.env.databaseDialect, // This ensures that Sequelize uses mysql2
    ssl: 'Amazon RDS',
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});


module.exports = sequelize;