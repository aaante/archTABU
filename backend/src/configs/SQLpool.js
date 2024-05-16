import pkg from "pg";
const { Pool } = pkg;

export const POOL_CONFIG = (function() {
    const poolData = {
        user: "antesusic",
        password: "postgres",
        host: "127.0.0.1",
        port: 5432,
        database: "archtabu",
        max: 10,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 0,
    };

    const pool = new Pool(poolData);

    return { pool };
})();
