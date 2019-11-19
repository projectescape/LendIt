const checkLogin = (req, res, next) => {
  if (req.user == null) {
    return res.redirect("/auth/google");
  }
  next();
};

module.exports = checkLogin;
