"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterProviderFieldToProviderId1589922495627 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    })); // Regras para relacionar as tabelas

    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',

      /* O que acontece quando o usuário for deletado.
      SET NULL = os usuários serão marcado como nulos
      RESTRICT = Não permite que o usuário seja deletado
      CASCADE = deleta todos os agendamentos que ele está relacionado.
      */
      // Caso o id do usuário seja modificado.
      onUpdate: 'CASCADE'
    }));
  } // Precisa desfazer o que foi criado em ordem reversa.


  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider',
      type: 'varchar'
    }));
  }

}

exports.default = AlterProviderFieldToProviderId1589922495627;