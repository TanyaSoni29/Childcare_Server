/** @format */

// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust path if needed

const User = sequelize.define(
	'User',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true },
		username: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
		firstname: { type: DataTypes.STRING },
		lastname: { type: DataTypes.STRING },
		company: { type: DataTypes.STRING },
		date_of_birth: { type: DataTypes.DATE },
		email: { type: DataTypes.STRING },
		phone: { type: DataTypes.STRING },
		fax: { type: DataTypes.STRING },
		cell: { type: DataTypes.STRING },
		category_id: { type: DataTypes.INTEGER, defaultValue: 4 },
		paypal_payerid: { type: DataTypes.STRING },
		sort_order: { type: DataTypes.INTEGER },
		address: { type: DataTypes.STRING },
		city: { type: DataTypes.STRING },
		province: { type: DataTypes.STRING },
		postal: { type: DataTypes.STRING },
		status: { type: DataTypes.INTEGER },
		summary: { type: DataTypes.TEXT },
		clientnum: { type: DataTypes.INTEGER },
		stage: { type: DataTypes.INTEGER },
		region: { type: DataTypes.STRING },
		new_region: { type: DataTypes.STRING },
	},
	{
		tableName: 'users', // Specify the exact table name
		timestamps: false, // Skip adding `createdAt` and `updatedAt`
		freezeTableName: true, // Prevent Sequelize from pluralizing table names
	}
);

module.exports = User;
