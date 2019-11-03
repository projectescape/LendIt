const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hi: "Holla" });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("Inside server /auth/google/callback");
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    // function added by passport
    req.logout();
    res.redirect("/auth/Success");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
