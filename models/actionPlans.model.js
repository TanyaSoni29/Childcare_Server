/** @format */

// models/actionPlan.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust path if needed

const ActionPlan = sequelize.define(
	'ActionPlan',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User, // Reference to User model
				key: 'id', // Key in User model to reference
			},
			onDelete: 'CASCADE', // Optional: Define cascading behavior
			onUpdate: 'CASCADE', // Optional: Define update behavior
		},
		coach_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User, // Reference to User model
				key: 'id', // Key in User model to reference
			},
			onDelete: 'CASCADE', // Optional: Define cascading behavior
			onUpdate: 'CASCADE',
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: 'action_plans', // Specify the exact table name
		timestamps: false, // Skip adding `createdAt` and `updatedAt`
		freezeTableName: true, // Prevent Sequelize from pluralizing table names
	}
);

User.hasMany(ActionPlan, { foreignKey: 'user_id' });
ActionPlan.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ActionPlan;
