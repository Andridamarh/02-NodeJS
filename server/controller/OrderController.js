const findAllROws = async (req, res) => {
  try {
    const result = await req.context.models.orders.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found");
  }
};

const createRows = async (req, res) => {
  const {
    order_createdon,
    order_total_qty,
    order_subtotal,
    order_discount,
    order_tax,
    order_address,
    order_phone,
    order_city,
    order_status,
    order_user_id,
  } = req.body;

  const result = await req.context.models.orders.create({
    order_createdon: order_createdon,
    order_total_qty: parseInt(order_total_qty),
    order_subtotal: parseFloat(order_subtotal),
    order_discount: parseFloat(order_discount),
    order_tax: parseFloat(order_tax),
    order_total_due: parseFloat((order_subtotal * ((100-order_discount)/100)) * ((100+order_tax)/100) ),
    order_address: order_address,
    order_phone: order_phone,
    order_city: order_city,
    order_status: order_status,
    order_user_id: parseInt(order_user_id),
  });

  return res.send(result);
};

export default {
  findAllROws,
  createRows
};
