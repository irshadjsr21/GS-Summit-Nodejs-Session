const jwt = require("jsonwebtoken");

const config = require("../config");

module.exports = {
  sign: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = { sub: userId };
        const token = await jwt.sign(payload, config.JWT.SECRET, {
          expiresIn: config.JWT.EXPIRES_IN,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  },

  verify: async (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = await jwt.verify(token, config.JWT.SECRET);
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  },
};
