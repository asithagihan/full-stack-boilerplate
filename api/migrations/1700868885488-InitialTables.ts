import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1700868885488 implements MigrationInterface {
    name = 'InitialTables1700868885488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sku\` varchar(255) NOT NULL, \`barcode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`availableQty\` int NOT NULL, \`reorderLevel\` int NOT NULL, UNIQUE INDEX \`IDX_04b4bcce1bb7609fc226ce8c6c\` (\`sku\`), UNIQUE INDEX \`item_sku_constraint\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`item_sku_constraint\` ON \`item\``);
        await queryRunner.query(`DROP INDEX \`IDX_04b4bcce1bb7609fc226ce8c6c\` ON \`item\``);
        await queryRunner.query(`DROP TABLE \`item\``);
    }

}
