const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const ChildcareJourney = sequelize.define('ChildcareJourney', {
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
    tableName: 'childcare_journey',
    timestamps: true,
});

module.exports = ChildcareJourney;
