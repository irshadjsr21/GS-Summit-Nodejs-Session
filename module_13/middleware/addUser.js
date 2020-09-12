const jwt = require('../utils/jwt');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const header = req.get('Authorization');
    if (header) {
      const splitedHeader = header.split(' ');
      let token;
      if (splitedHeader.length === 2) {
        token = splitedHeader[1];
      }

      const payload = await jwt.verify(token);
      if (payload) {
        const user = await User.findById(payload.sub);
        if (user) {
          req.tokenPayload = payload;
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    next();
  }
};
