const jwt = require("jsonwebtoken");

const token = {
  sign(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  },

  verify(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  },

  extract(token){
    return token.split(' ')[1]
  }
};

module.exports = { token };
