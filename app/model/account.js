'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  return sequelize.define('account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "唯一标识"
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "用户名",
      unique: "unique_username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "密码"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "电子邮件"
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "电话"
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "微信用户唯一标识",
      unique: "unique_open_id"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'account',
    timestamps: false,
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
        name: "unique_username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "unique_open_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
