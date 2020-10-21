"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis);
  }

  async save(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }

  async recover(key) {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parcedData = JSON.parse(data);
    return parcedData;
  }

  async invalidate(key) {
    await this.client.del(key);
  }

  async invalidatePrefix(prefix) {
    // Keys recebe uma pattern string
    // mostrando quais arquivos devem ser atingidos
    // * representa todos os registros com o prefixo independente do que vem depois
    // Recebe como respostas as chaves que atendem ao pattern
    const keys = await this.client.keys(`${prefix}:*`); // Pipeline executa múltiplas tarefas ao mesmo tempo sem bloquear o serviço.

    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }

}

exports.default = RedisCacheProvider;