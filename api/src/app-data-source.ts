import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
const HOST: string = process.env.DB_HOST;
const PORT: number = parseInt(process.env.DB_PORT);
const USERNAME: string = process.env.DB_USERNAME;
const PASSWORD: string = process.env.DB_PASSWORD;
const DATABASE: string = process.env.DB_NAME;

const dataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: ["src/entity/*/*.ts"],
  logging: true,
  synchronize: false,
  migrations: ["migrations/*"],
  migrationsTableName: "custom_migration_table",
});

export { dataSource };
