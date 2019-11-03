let { Item } = require("../services/bookshelf");

module.exports = app => {
  app.post("/api/items", async (req, res) => {
    const item = await Item.forge({
      ...req.body,
      user: req.user.email,
      status: "available"
    }).save();
    res.send(item);
  });
};
