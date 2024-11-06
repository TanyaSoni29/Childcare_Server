/** @format */

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

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
	},
	{
		tableName: 'blog',
		timestamps: true,
	}
);

module.exports = Blog;
