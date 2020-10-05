import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTokens1593561173873
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'TokenUser', // Qual o nome desse relacionamento?
            referencedTableName: 'users', // Qual tabela será relacionada com essa?
            referencedColumnNames: ['id'], // Qual coluna será relacionada?
            columnNames: ['user_id'], // Qual coluna dessa tabela vai receber o relacionamento?
            onDelete: 'CASCADE', // se um usuário for deletado delete também os tokens
            onUpdate: 'CASCADE', // Se o id de um usuário for atualizado delete os tokens
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
