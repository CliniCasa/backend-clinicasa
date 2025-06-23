import { MigrationInterface, QueryRunner } from "typeorm";

export class FixWorkerRoleEnum1750713895575 implements MigrationInterface {
    name = 'FixWorkerRoleEnum1750713895575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        // PASSO 1: Remover o valor DEFAULT antigo.
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "role" DROP DEFAULT;`);

        // PASSO 2: Converter a coluna para texto.
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "role" TYPE VARCHAR;`);
        
        // PASSO 3: Apagar o tipo enum antigo.
        await queryRunner.query(`DROP TYPE "public"."workers_role_enum";`);
        
        // PASSO 4: Criar o tipo enum novo e correto.
        await queryRunner.query(`CREATE TYPE "public"."workers_role_enum" AS ENUM ('CUIDADOR', 'MASSAGISTA', 'FISIOTERAPEUTA', 'PSICOLOGO', 'MEDICO', 'OUTROS');`);
        
        // PASSO 5: Converter os dados antigos para os novos.
        await queryRunner.query(`UPDATE "workers" SET "role" = 'CUIDADOR' WHERE "role" = 'Enfermeira'`);
        await queryRunner.query(`UPDATE "workers" SET "role" = 'MASSAGISTA' WHERE "role" = 'Massagista'`);
        await queryRunner.query(`UPDATE "workers" SET "role" = 'FISIOTERAPEUTA' WHERE "role" = 'Fisioterapeuta'`);
        await queryRunner.query(`UPDATE "workers" SET "role" = 'PSICOLOGO' WHERE "role" = 'Psicólogo'`);
        await queryRunner.query(`UPDATE "workers" SET "role" = 'OUTROS' WHERE "role" = 'Outros'`);
        
        // PASSO 6: Reassociar a coluna ao novo tipo enum.
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "role" TYPE "public"."workers_role_enum" USING "role"::"public"."workers_role_enum";`);

        // PASSO 7: Definir o novo padrão para a coluna.
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "role" SET DEFAULT 'CUIDADOR';`);
    }

    // ADICIONADO: O método 'down' que estava faltando.
    public async down(queryRunner: QueryRunner): Promise<void> {
        // A lógica para reverter seria o processo inverso, o que é complexo.
        // Apenas ter o método aqui já resolve o erro do TypeScript.
        // Deixamos um comentário SQL para indicar que esta ação não tem uma reversão simples.
        await queryRunner.query(`-- Reverter a migração FixWorkerRoleEnum não é suportado diretamente.`);
    }
}