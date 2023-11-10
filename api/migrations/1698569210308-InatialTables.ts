import { MigrationInterface, QueryRunner } from "typeorm";

export class InatialTables1698569210308 implements MigrationInterface {
    name = 'InatialTables1698569210308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4a3f3a286a3d055274192578e8\` (\`code\`), UNIQUE INDEX \`account_code_constraint\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bom_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemId\` int NOT NULL, \`bomId\` int NOT NULL, \`qty\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bom\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4d46ae1d12fa05fbcd7aa77516\` (\`name\`), UNIQUE INDEX \`bom_name_constraint\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_adjustment_entry\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemId\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`itemAdjustment\` int NOT NULL, UNIQUE INDEX \`IDX_41f74df3e7c7ddca08ea8a9fad\` (\`itemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_adjustment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sku\` varchar(255) NOT NULL, \`barcode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`availableQty\` int NOT NULL, \`reorderLevel\` int NOT NULL, \`unit\` enum ('ml', 'pcs', 'g') NOT NULL DEFAULT 'pcs', \`itemType\` enum ('FINISHED_PRODUCT', 'PACKAGING', 'MATERIAL', 'MAIN_BATCH', 'INPROGRESS_PRODUCT', 'CONSUMABLE') NOT NULL DEFAULT 'MATERIAL', \`image\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_04b4bcce1bb7609fc226ce8c6c\` (\`sku\`), UNIQUE INDEX \`item_sku_constraint\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_bom\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_df5fbbe90ba240da550653178e\` (\`name\`), UNIQUE INDEX \`job_bom_name_constraint\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_parameter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_454ed455a1287ff30c953eb42e\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`bom_id\` int NOT NULL, \`jobType\` enum ('MAIN_BATCH', 'CURING', 'CUTTING', 'MOULDING', 'QA', 'LABEL_PRINTING', 'FILLING', 'PACKING') NOT NULL DEFAULT 'MAIN_BATCH', \`production_order_template_id\` int NOT NULL, \`user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_70161b46165fedc355da7d80b2\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production_order_template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0a822b461c616fe47bc7de52a3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`jobType\` enum ('MAIN_BATCH', 'CURING', 'CUTTING', 'MOULDING', 'QA', 'LABEL_PRINTING', 'FILLING', 'PACKING') NOT NULL DEFAULT 'MAIN_BATCH', \`job_bom_id\` int NOT NULL, \`production_order_id\` int NOT NULL, \`user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0a0e501362e199a2339881f486\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production_plan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`user\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`production_plan_id\` int NOT NULL, \`user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_3deba6b2ed92370173d403097e\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3deba6b2ed92370173d403097e\` ON \`production_order\``);
        await queryRunner.query(`DROP TABLE \`production_order\``);
        await queryRunner.query(`DROP TABLE \`production_plan\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a0e501362e199a2339881f486\` ON \`job\``);
        await queryRunner.query(`DROP TABLE \`job\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a822b461c616fe47bc7de52a3\` ON \`production_order_template\``);
        await queryRunner.query(`DROP TABLE \`production_order_template\``);
        await queryRunner.query(`DROP INDEX \`IDX_70161b46165fedc355da7d80b2\` ON \`job_template\``);
        await queryRunner.query(`DROP TABLE \`job_template\``);
        await queryRunner.query(`DROP INDEX \`IDX_454ed455a1287ff30c953eb42e\` ON \`job_parameter\``);
        await queryRunner.query(`DROP TABLE \`job_parameter\``);
        await queryRunner.query(`DROP INDEX \`job_bom_name_constraint\` ON \`job_bom\``);
        await queryRunner.query(`DROP INDEX \`IDX_df5fbbe90ba240da550653178e\` ON \`job_bom\``);
        await queryRunner.query(`DROP TABLE \`job_bom\``);
        await queryRunner.query(`DROP INDEX \`item_sku_constraint\` ON \`item\``);
        await queryRunner.query(`DROP INDEX \`IDX_04b4bcce1bb7609fc226ce8c6c\` ON \`item\``);
        await queryRunner.query(`DROP TABLE \`item\``);
        await queryRunner.query(`DROP TABLE \`item_adjustment\``);
        await queryRunner.query(`DROP INDEX \`IDX_41f74df3e7c7ddca08ea8a9fad\` ON \`item_adjustment_entry\``);
        await queryRunner.query(`DROP TABLE \`item_adjustment_entry\``);
        await queryRunner.query(`DROP INDEX \`bom_name_constraint\` ON \`bom\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d46ae1d12fa05fbcd7aa77516\` ON \`bom\``);
        await queryRunner.query(`DROP TABLE \`bom\``);
        await queryRunner.query(`DROP TABLE \`bom_item\``);
        await queryRunner.query(`DROP INDEX \`account_code_constraint\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a3f3a286a3d055274192578e8\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
