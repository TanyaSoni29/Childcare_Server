const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// Define the NewsEvent model
const NewsEvent = sequelize.define('NewsEvent', {
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
    tableName: 'news_events', // Set the table name
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

module.exports = NewsEvent;
