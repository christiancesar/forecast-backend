import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAddress1629337306203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reference',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state_acronym',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('address');
  }
}
