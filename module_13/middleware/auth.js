const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access." });
  }
  return next();
};

module.exports = authenticate;
