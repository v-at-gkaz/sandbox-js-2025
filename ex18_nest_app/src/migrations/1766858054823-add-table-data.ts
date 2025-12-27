import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableData1766858054823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // WARNING: EXTERNAL DATABASE !!!
    /*await queryRunner.query(
      `ALTER TABLE "data" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "data" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "data_pkey" ON "data" ("id") `,
    );*/
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /*await queryRunner.query(`DROP INDEX "public"."data_pkey"`);
    await queryRunner.query(
      `ALTER TABLE "data" ALTER COLUMN "created_at" TYPE TIMESTAMP(3) WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "data" ALTER COLUMN "updated_at" TYPE TIMESTAMP(3) WITH TIME ZONE`,
    );*/
  }
}
