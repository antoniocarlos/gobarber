"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messageges = [];
  }

  async sendMail(message) {
    this.messageges.push(message);
  }

}

exports.default = FakeMailProvider;