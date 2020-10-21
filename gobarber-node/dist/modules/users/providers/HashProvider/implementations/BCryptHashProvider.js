"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHashProvider {
  async generateHash(payload) {
    const hashedPassword = await (0, _bcryptjs.hash)(payload, 8);
    return hashedPassword;
  }

  async compareHash(payload, hashed) {
    const response = await (0, _bcryptjs.compare)(payload, hashed);
    return response;
  }

}

var _default = BCryptHashProvider;
exports.default = _default;