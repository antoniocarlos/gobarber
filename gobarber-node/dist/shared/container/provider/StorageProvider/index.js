"use strict";

var _tsyringe = require("tsyringe");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

var _S3StorageProvider = _interopRequireDefault(require("./implementations/S3StorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  disk: _tsyringe.container.resolve(_DiskStorageProvider.default),
  s3: _tsyringe.container.resolve(_S3StorageProvider.default)
}; // O registerSingleton cria uma instancia da classe sem usar o constructor dela.
// Para ativar o constructor deve ser usada o registerInstance e fazer o instanciamento manualmente.

_tsyringe.container.registerInstance('StorageProvider', providers[_upload.default.driver]);