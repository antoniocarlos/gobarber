"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Qual é a depêndêcia que será injetada?
_tsyringe.container.registerSingleton('HashProvider', // Como será chamada essa injeção
_BCryptHashProvider.default);