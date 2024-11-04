const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Practice = sequelize.define('Practice', {
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
    tableName: 'practice',
    timestamps: true,
});

module.exports = Practice;
