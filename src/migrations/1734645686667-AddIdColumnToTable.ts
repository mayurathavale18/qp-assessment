import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdColumnToTable1734645686667 implements MigrationInterface {
    name = 'AddIdColumnToTable1734645686667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "UQ_f885d3717dd4cf25f6eb035024f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "inventory" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "inventory"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "UQ_f885d3717dd4cf25f6eb035024f"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "id"`);
    }

}
