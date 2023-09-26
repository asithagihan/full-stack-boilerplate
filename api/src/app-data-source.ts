import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  // host: "localhost",
  // port: 3306,
  // username: "root",
  // password: "test",
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});

export { dataSource };
