import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1766848661005 implements MigrationInterface {
  name = 'Init1766848661005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "typeorm"."products" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "price" numeric, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "typeorm"."order_product" ("order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" bigint NOT NULL DEFAULT '1', CONSTRAINT "PK_c1485ff3203bb824ec178c15244" PRIMARY KEY ("order_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "typeorm"."orders" ("id" SERIAL NOT NULL, "customer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "typeorm"."customers" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "user_id" integer, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "REL_11d81cd7be87b6f8865b0cf766" UNIQUE ("user_id"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "typeorm"."users" ("id" SERIAL NOT NULL, "login" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "typeorm"."orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "typeorm"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "typeorm"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."customers" ADD CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661" FOREIGN KEY ("user_id") REFERENCES "typeorm"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "typeorm"."customers" DROP CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661"`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "typeorm"."order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`,
    );
    await queryRunner.query(`DROP TABLE "typeorm"."users"`);
    await queryRunner.query(`DROP TABLE "typeorm"."customers"`);
    await queryRunner.query(`DROP TABLE "typeorm"."orders"`);
    await queryRunner.query(`DROP TABLE "typeorm"."order_product"`);
    await queryRunner.query(`DROP TABLE "typeorm"."products"`);
  }
}
