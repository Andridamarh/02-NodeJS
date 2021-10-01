import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }

);

const DataTypes = require("sequelize").DataTypes;
const _carts = require("./carts");
const _category = require("./category");
const _line_items = require("./line_items");
const _orders = require("./orders");
const _product_images = require("./product_images");
const _products = require("./products");
const _users = require("./users");

const initModels = (sequelize) => {
  const carts = _carts(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const line_items = _line_items(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const product_images = _product_images(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  carts.belongsToMany(products, {through: line_items, foreignKey: "lite_cart_id", otherKey: "lite_prod_id" });
  products.belongsToMany(carts, {through: line_items, foreignKey: "lite_prod_id", otherKey: "lite_cart_id" });
  line_items.belongsTo(carts, {foreignKey: "lite_cart_id"});
  carts.hasMany(line_items, { as: "line_items", foreignKey: "lite_cart_id"});
  products.belongsTo(category, {foreignKey: "prod_cate_id"});
  category.hasMany(products, {foreignKey: "prod_cate_id"});
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

const models = initModels(sequelize)
export default models
export {sequelize}

/* module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels; */
