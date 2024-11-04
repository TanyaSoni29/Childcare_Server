/** @format */

const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Covid19 = require('./covid19.model');

const Blog = sequelize.define(
	'Blog',
	{
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
		type: {
			type: DataTypes.ENUM(
				'childcare',
				'practice',
				'covid19',
				'family',
				'federal'
			),
			defaultValue: 'family',
		},
	},
	{
		tableName: 'childcare_journey',
		timestamps: true,
	}
);

module.exports = Blog;
