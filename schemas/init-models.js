var DataTypes = require("sequelize").DataTypes;
var _carts = require("./carts");
var _category = require("./category");
var _line_items = require("./line_items");
var _orders = require("./orders");
var _product_images = require("./product_images");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var carts = _carts(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var line_items = _line_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  carts.belongsToMany(products, { as: 'lite_prod_id_products', through: line_items, foreignKey: "lite_cart_id", otherKey: "lite_prod_id" });
  products.belongsToMany(carts, { as: 'lite_cart_id_carts', through: line_items, foreignKey: "lite_prod_id", otherKey: "lite_cart_id" });
  line_items.belongsTo(carts, { as: "lite_cart", foreignKey: "lite_cart_id"});
  carts.hasMany(line_items, { as: "line_items", foreignKey: "lite_cart_id"});
  products.belongsTo(category, { as: "prod_cate", foreignKey: "prod_cate_id"});
  category.hasMany(products, { as: "products", foreignKey: "prod_cate_id"});
  line_items.belongsTo(products, { as: "lite_prod", foreignKey: "lite_prod_id"});
  products.hasMany(line_items, { as: "line_items", foreignKey: "lite_prod_id"});
  product_images.belongsTo(products, { as: "prim_prod", foreignKey: "prim_prod_id"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "prim_prod_id"});
  carts.belongsTo(users, { as: "cart_user", foreignKey: "cart_user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "cart_user_id"});
  orders.belongsTo(users, { as: "order_user", foreignKey: "order_user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "order_user_id"});
  products.belongsTo(users, { as: "prod_user", foreignKey: "prod_user_id"});
  users.hasMany(products, { as: "products", foreignKey: "prod_user_id"});

  return {
    carts,
    category,
    line_items,
    orders,
    product_images,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
