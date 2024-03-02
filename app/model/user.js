'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "用户ID"
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "微信用户唯一标识",
      unique: "unique_open_id"
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "用户名"
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "昵称"
    },
    is_admin: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      comment: "密码"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "邮箱"
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "电话"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "头像"
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "性别"
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "国家"
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "省份"
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "城市"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "修改时间"
    }
  }, {
    sequelize,
    tableName: 'user',
    // 启用时间戳
    timestamps: true,
    // 自定义字段名
    createdAt: 'create_time',
    updatedAt: 'update_time',
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
