const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// Define the FamilyEvent model
const FamilyEvent = sequelize.define('FamilyEvent', {
    post_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cover_img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'family_events', // Set the table name
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

module.exports = FamilyEvent;
