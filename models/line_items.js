const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('line_items', {
    lite_prod_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    },
    lite_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'carts',
        key: 'cart_id'
      }
    },
    lite_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lite_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lite_total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lite_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lite_order_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'line_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "lite_prod_cart_id_pk",
        unique: true,
        fields: [
          { name: "lite_prod_id" },
          { name: "lite_cart_id" },
        ]
      },
    ]
  });
};
