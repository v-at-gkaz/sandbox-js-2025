import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1766249909412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users" (login,"password") VALUES ('admin','admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE login='admin'`);
  }
}
