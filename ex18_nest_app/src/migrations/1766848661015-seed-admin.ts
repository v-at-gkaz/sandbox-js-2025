import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1766848661015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "typeorm"."users" (login,"password") VALUES ('admin','admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm"."users" WHERE login='admin'`,
    );
  }
}
