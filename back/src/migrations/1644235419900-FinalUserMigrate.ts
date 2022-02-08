import {MigrationInterface, QueryRunner} from "typeorm";

export class FinalUserMigrate1644235419900 implements MigrationInterface {
    name = 'FinalUserMigrate1644235419900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "cpf" varchar NOT NULL, "cep" varchar NOT NULL, "numerocasa" integer NOT NULL, "celular" varchar NOT NULL, "logradouro" varchar NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "uf" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
