"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserTokens1593561173873 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_tokens',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'token',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'TokenUser',
        // Qual o nome desse relacionamento?
        referencedTableName: 'users',
        // Qual tabela será relacionada com essa?
        referencedColumnNames: ['id'],
        // Qual coluna será relacionada?
        columnNames: ['user_id'],
        // Qual coluna dessa tabela vai receber o relacionamento?
        onDelete: 'CASCADE',
        // se um usuário for deletado delete também os tokens
        onUpdate: 'CASCADE' // Se o id de um usuário for atualizado delete os tokens

      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_tokens');
  }

}

exports.default = CreateUserTokens1593561173873;