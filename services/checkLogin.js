const checkLogin = (req, res, next) => {
  // Causing issues, fix later
  // if (req.user == null) {
  //   return res.redirect("/auth/google");
  // }
  next();
};

module.exports = checkLogin;
