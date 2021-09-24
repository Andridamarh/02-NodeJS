const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    prod_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prod_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prod_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    prod_desc: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    prod_url_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prod_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_view_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    prod_cate_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'cate_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "prod_id_pk",
        unique: true,
        fields: [
          { name: "prod_id" },
        ]
      },
    ]
  });
};
