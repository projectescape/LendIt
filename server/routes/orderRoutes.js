let { Order, Item } = require("../services/bookshelf");

module.exports = app => {
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.where("user", req.user.email).fetchAll();
    res.send(orders);
  });

  app.post("/api/placeOrder", async (req, res) => {
    const items = req.body.slice();
    for (var i = 0; i < items.length; i++) {
      await Order.forge({
        user: req.user.email,
        item: items[i].id,
        status: "lent",
        quantity: items[i].quantity
      }).save();
    }
    for (var i = 0; i < items.length; i++) {
      await Item.where("id", items[i].id).save(
        {
          status: "lent"
        },
        { patch: true }
      );
    }
    res.send({ items });
  });

  app.put("/api/returnItem", async (req, res) => {
    const order = await Order.where("id", req.body.id).save(
      {
        status: "returned",
        returned_at: new Date()
      },
      { patch: true }
    );
    await Item.where("id", order.attributes.item).save(
      {
        status: "available"
      },
      { patch: true }
    );
    res.send(order);
  });
};
