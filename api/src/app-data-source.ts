import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "nubpew-ryxto7-hYnxaz",
  database: "platform",
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: false,
  migrations: ["migrations/*"],
  migrationsTableName: "custom_migration_table",
});

export { dataSource };
