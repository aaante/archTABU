import pkg from "pg";
const { Client } = pkg;

const SQLclient = new Client({
    user: "antesusic",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "archtabu",
});

export { SQLclient };
