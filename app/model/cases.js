'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  const Cases = sequelize.define('cases', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    series: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cases',
    timestamps: false,
    fieldComment: true,
    deletedAt: false,
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


  // 添加这部分代码来定义关联
  Cases.associate = function() {
    Cases.hasMany(app.model.CaseImages, { foreignKey: 'case_id' });
  };

  return Cases;
};