'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  const CaseImages = sequelize.define('case_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "关联案例",
      references: {
        model: 'cases',
        key: 'id'
      }
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "图片地址"
    }
  }, {
    sequelize,
    tableName: 'case_images',
    timestamps: false,
    fieldComment: true,
  });

  // 添加这部分代码来定义关联
  CaseImages.associate = function() {
    CaseImages.belongsTo(app.model.Cases, { foreignKey: 'case_id' });
  };

  return CaseImages;
};
