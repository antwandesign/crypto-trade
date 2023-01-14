const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verify = promisify(jwt.verify);
exports.sign = promisify(jwt.sign);
