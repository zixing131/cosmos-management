'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "openid"
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "phone_number"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    fieldComment: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "openid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "openid" },
        ]
      },
      {
        name: "phone_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
    ]
  });
};
