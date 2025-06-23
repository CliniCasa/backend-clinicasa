import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceToAppointments1750718289959 implements MigrationInterface {
    name = 'AddServiceToAppointments1750718289959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_service_enum" AS ENUM('Aplicação de Injeção', 'Realização de Curativo', 'Aferição de Pressão', 'Massagem Relaxante', 'Drenagem Linfática', 'Shiatsu', 'Fisioterapia Motora', 'Fisioterapia Respiratória', 'Pilates Clínico', 'Sessão de Terapia Individual', 'Terapia de Casal', 'Avaliação Psicológica', 'Consulta Clínica Geral', 'Emissão de Atestado', 'Prescrição de Medicamentos', 'Transporte de Paciente', 'Acompanhamento em Consulta', 'Suporte Administrativo')`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "service" TYPE "public"."appointments_service_enum" USING "service"::"public"."appointments_service_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "service" TYPE character varying`);
        await queryRunner.query(`DROP TYPE "public"."appointments_service_enum"`);
    }

}
