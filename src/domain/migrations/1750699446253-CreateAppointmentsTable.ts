import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTable1750699446253 implements MigrationInterface {
    name = 'CreateAppointmentsTable1750699446253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'SCHEDULED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "workerId" uuid, "userId" integer, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_54294b8981b571f1d778c59274d" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_54294b8981b571f1d778c59274d"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
    }
}
