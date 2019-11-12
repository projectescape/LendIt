const passport = require("passport");
const { User } = require("../services/bookshelf");
const checkLogin = require("../services/checkLogin");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    // function added by passport
    req.logout();
    res.redirect("/auth/Success");
  });

  app.get("/api/current_user", checkLogin, (req, res) => {
    res.send(req.user);
  });

  app.put("/api/user", checkLogin, async (req, res) => {
    const user = await User.where("email", req.user.email).save(
      {
        ...req.body
      },
      { patch: true }
    );
    res.send(user);
  });
};
