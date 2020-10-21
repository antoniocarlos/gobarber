"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeDiskStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const index = this.storage.findIndex(f => f === file);
    this.storage.splice(index, 1);
  }

}

var _default = FakeDiskStorageProvider;
exports.default = _default;