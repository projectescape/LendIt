let { Item } = require("../services/bookshelf");
const checkLogin = require("../services/checkLogin");

module.exports = app => {
  app.get("/api/items", checkLogin, async (req, res) => {
    const items = await new Item().fetchAll();
    res.send(items);
  });

  app.post("/api/items", checkLogin, async (req, res) => {
    const item = await Item.forge({
      ...req.body,
      user: req.user.email,
      status: "available"
    }).save();
    res.send(item);
  });
};
