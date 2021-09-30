const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    cate_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cate_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "category_cate_name_key"
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cate_id_pk",
        unique: true,
        fields: [
          { name: "cate_id" },
        ]
      },
      {
        name: "category_cate_name_key",
        unique: true,
        fields: [
          { name: "cate_name" },
        ]
      },
    ]
  });
};
