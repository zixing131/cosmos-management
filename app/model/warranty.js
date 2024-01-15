'use strict';

const { DataTypes } = require('sequelize');
module.exports = function(app, sequelize) {
  return sequelize.define('warranty', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "唯一标识，主键"
    },
    dealer: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "经销商名称"
    },
    owner_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "车主姓名"
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "车主联系电话"
    },
    license_plate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "车牌号码"
    },
    car_brand: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "车辆品牌"
    },
    product_series: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "产品系列"
    },
    coil_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "卷轴编号"
    },
    construction_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "施工日期"
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "质保截止日期"
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "当前状态"
    },
    vehicle_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "车辆照片"
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "总报价"
    }
  }, {
    sequelize,
    tableName: 'warranty',
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
