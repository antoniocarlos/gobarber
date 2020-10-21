"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  // Validação do token JWT
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  } // primeira parte do token é a palavra Bearin que não será usada


  const [, token] = autHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}