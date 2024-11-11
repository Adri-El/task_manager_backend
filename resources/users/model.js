const sequelize = require("../../lib/databaseConfig")
const { DataTypes } = require('sequelize');

// Define a model
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'
});

(async () => {
    await sequelize.sync(); // This creates the table if it doesn't exist (if you want to use sync)
})();

module.exports = User;