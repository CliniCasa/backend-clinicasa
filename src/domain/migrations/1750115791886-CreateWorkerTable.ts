import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkerTable1750115791886 implements MigrationInterface {
    name = 'CreateWorkerTable1750115791886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workers_role_enum" AS ENUM('Enfermeira', 'Massagista', 'Fisioterapeuta', 'Psicólogo', 'Outros')`);
        await queryRunner.query(`CREATE TABLE "workers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying NOT NULL, "role" "public"."workers_role_enum" NOT NULL DEFAULT 'Enfermeira', CONSTRAINT "UQ_87f2092ffaae628ef63547d2442" UNIQUE ("email"), CONSTRAINT "PK_e950c9aba3bd84a4f193058d838" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workers"`);
        await queryRunner.query(`DROP TYPE "public"."workers_role_enum"`);
    }

}