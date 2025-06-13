import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const DEFAULT = [
  {
    name: 'Next Sales',
    image: '/default/logo.svg',
  },
] as const;

export class CreateContactTable1747468194882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'branch',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'date',
            isNullable: false,
            default: "'now()'",
          },
          {
            name: 'updatedAt',
            type: 'date',
            isNullable: false,
            default: "'now()'",
          },
          {
            name: 'deletedAt',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('branch')
      .values(DEFAULT)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('branch');
  }
}
