const keys = require("../config/keys");

const config = {
  client: "pg",
  connection: {
    ...keys.db,
    ssl: "true",
    charset: "utf8"
  }
};

var knex = require("knex")(config);
var bookshelf = require("bookshelf")(knex);

var User = bookshelf.Model.extend({
  requireFetch: false,
  tableName: "user"
});

var Item = bookshelf.Model.extend({
  requireFetch: false,
  tableName: "item",
  hasTimestamps: true
});

var Order = bookshelf.Model.extend({
  requireFetch: false,
  tableName: "order",
  hasTimestamps: true
});

module.exports = { User, Item, Order };
