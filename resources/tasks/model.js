const sequelize = require("../../lib/databaseConfig")
const moment = require('moment')
const { DataTypes } = require('sequelize');

// Define a model
const Task = sequelize.define('Task', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: "Untitled",
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: "No description",
        allowNull: false
    },
    dueDate: {
        type: DataTypes.STRING,
        defaultValue: ()=>moment().format('YYYY-MM-DD'),
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        defaultValue: "low",
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        allowNull: false
    },
    completed: {
        type: DataTypes.STRING,
        defaultValue: "false",
        allowNull: false
    }
}, {
    tableName: 'tasks'
});

(async () => {
    await sequelize.sync(); // This creates the table if it doesn't exist (if you want to use sync)
})();

module.exports = Task;

//defaultValue: ()=>moment().format('YYYY-MM-DD'),
