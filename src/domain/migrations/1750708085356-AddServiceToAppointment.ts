import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceToAppointment1750708085356 implements MigrationInterface {
    name = 'AddServiceToAppointment1750708085356'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ADD "service" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "service"`);
    }

}