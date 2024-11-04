const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Covid19 = sequelize.define('Covid19', {
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
    tableName: 'covid19',
    timestamps: true,
});

module.exports = Covid19;
