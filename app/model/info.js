'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  return sequelize.define('info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "唯一标识，主键"
    },
    info_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "唯一值KEY"
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "分组KEY"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "存储实际内容"
    },
    pinned_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "顶置时间"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'info',
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
    ]
  });
};
