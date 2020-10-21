"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // Configura qual driver estamos usando para envio de email
  driver: process.env.MAIL_DRIVER || 'ethereal',
  // Caso esta variavel não esteja preenchida é assumido o valor de desenvolvimento
  defaults: {
    from: {
      email: 'equipe@gobarber.com.br',
      name: 'Equipe GoBarber'
    }
  }
}; // Dessa forma conseguimos garantir que só um desses dois valores será passado.

exports.default = _default;