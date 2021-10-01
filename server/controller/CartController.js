import formidable from "formidable";
import fs from "fs";
import path from "path";
import { sequelize } from "../models/IndexModel";
import line_items from "../models/line_items";

const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.carts.findAll();
    if (result.length === 0) {
      return res.send("data empty");
    }
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const findCartById = async (req, res) => {
  try {
    const result = await req.context.models.carts.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const addToCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    const resultCart = await req.context.models.carts.findAll({
      where: { cart_user_id: parseInt(user_id) },
    });

    if (resultCart.length === 0) {
      const result = await req.context.models.carts.create({
        cart_createdon: sequelize.literal("current_timestamp"),
        cart_status: "OPEN",
        cart_user_id: parseInt(user_id),
      });

      return res.send(result);
    }

    return res.send("Cart already exist");
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

/* const addLite = async (req, res) => {
  try {
    const { prod_id, cart_id, lite_qty } = req.body;

    const resultProd = await req.context.model.products.findAll({
      where : {prod_id : parseInt(prod_id)}
    })

    const resultLite = await req.context.model.line_items.findAll({
      where : {lite_cart_id : parseInt(cart_id)}
    })

    if (resultProd.length === 0){
      return res.send("Product not exist")
    }

    if (resultLite.length === 0){
      const result = await req.context.models.line_items.create({
        lite_prod_id: parseInt(prod_id),
        lite_cart_id: parseInt(cart_id),
        lite_qty: parseInt(lite_qty),
        lite_price: parseFloat(resultProd.dataValues.lite_price),
        lite_total_price: parseFloat(lite_qty * resultProd.dataValues.lite_price),
        lite_status: "OPEN",
      });

      return res.send(result);
    }

    return res.send("Line Item already exist")

    
  } catch (error) {
    return res.sendStatus(404).send("no data found");
  }
}; */

const addLite = async (req, res) => {
  try {
    const { prod_id, cart_id, lite_qty } = req.body;

    const resultProd = await req.context.models.products.findOne({
      raw: true,
      where: { prod_id: parseInt(prod_id) },
    });

    const resultLite = await req.context.models.line_items.findAll({
      where: {
        lite_cart_id: parseInt(cart_id),
        lite_prod_id: parseInt(prod_id),
      },
    });

    if (resultProd.length === 0) {
      return res.send("Product doesn't exist");
    }

    if (resultLite.length === 0) {
      const result = await req.context.models.line_items.create({
        lite_prod_id: parseInt(prod_id),
        lite_cart_id: parseInt(cart_id),
        lite_qty: parseInt(lite_qty),
        lite_price: parseFloat(resultProd.prod_price),
        lite_total_price: parseFloat(lite_qty * resultProd.prod_price),
        lite_status: "OPEN",
      });

      return res.send(result);
    }

    return res.send(resultLite);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const updateLite = async (req, res) => {
  const { lite_prod_id, lite_cart_id, lite_status, lite_qty } = req.body;

  const resultProd = await req.context.models.products.findOne({
    raw: true,
    where: { prod_id: parseInt(lite_prod_id) },
  });

  const result = await req.context.models.line_items.update(
    {
      lite_qty: parseInt(lite_qty),
      lite_status: lite_status,
      lite_total_price: parseFloat(lite_qty * resultProd.prod_price),
    },
    {
      returning: true,
      where: {
        lite_prod_id: parseInt(lite_prod_id),
        lite_cart_id: parseInt(lite_cart_id),
      },
    }
  );
  return res.send(result);
};

const checkOut = async (req, res) => {
  const result = await req.context.models.carts.findAll({
    include: [
      {
        model: req.context.models.line_items,
      },
    ],
  });
  return res.send(result);
};

export default {
  findAllRows,
  addToCart,
  updateLite,
  findCartById,
  addLite,
  checkOut,
};
