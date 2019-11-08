let { Order, Item } = require("../services/bookshelf");

module.exports = app => {
  app.get("/api/orders", async (req, res) => {
    res.send(req.user.email);
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
};
