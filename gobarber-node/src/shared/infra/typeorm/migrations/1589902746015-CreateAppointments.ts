import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1589902746015
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // O que desejo que aconteça no banco de dados quando essa migration for executada
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // tipo que só existe no postgress
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // O que quero desfazer. Quais modificações desejo implementar
    await queryRunner.dropTable('appointments');
  }
}
