const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_images', {
    prim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prim_filename: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    prim_filesize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prim_filetype: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    prim_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prim_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    prim_prod_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "prim_id_pk",
        unique: true,
        fields: [
          { name: "prim_id" },
        ]
      },
    ]
  });
};
