import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServicesAndDescriptionToWorker1750706620755 implements MigrationInterface {
    name = 'AddServicesAndDescriptionToWorker1750706620755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" ADD "services" text[] NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "workers" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "services"`);
    }

}
