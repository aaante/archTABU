import pkg from "pg";
const { Pool } = pkg;

const SQLpool = new Pool({
    user: "antesusic",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "archtabu",
    max: 10,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
});

export { SQLpool };
