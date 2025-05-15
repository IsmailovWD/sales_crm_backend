import { MigrationInterface, QueryRunner } from 'typeorm';

const DEFAULT = {
  name: 'Demo',
  database_name: 'sales_crm',
  hostnames: 'localhost',
} as const;

export class GeneratedTenantTableMigration1746899218000
  implements MigrationInterface
{
  name = 'GeneratedTenantTableMigration1746899218000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tenant" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying,
        "database_name" character varying NOT NULL,
        "hostnames" character varying NOT NULL,
        CONSTRAINT "UQ_database_name" UNIQUE ("database_name"),
        CONSTRAINT "PK_tenant_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "tenant" ("name", "database_name", "hostnames")
      VALUES ('${DEFAULT.name}', '${DEFAULT.database_name}', '${DEFAULT.hostnames}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tenant"`);
  }
}
