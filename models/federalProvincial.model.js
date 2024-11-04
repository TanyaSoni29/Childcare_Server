const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const FederalProvincial = sequelize.define('FederalProvincial', {
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
    tableName: 'federal_provincial',
    timestamps: true,
});

module.exports = FederalProvincial;
