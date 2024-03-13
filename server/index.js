import pkg from "pg";
const { Client } = pkg;
import { insertSQL } from "./insertSQL.js";

const client = new Client({
    user: "antesusic",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "archtabu",
});

insertSQL();

export { client };
