import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

export const POOL_CONFIG = (function() {
    const poolData = {
        user: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASSWORD,
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        database: process.env.POSTGRESQL_DATABASE,
        max: 10,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 0,
    };

    const pool = new Pool(poolData);

    const getPool = function() {
        return pool;
    };

    return { pool: getPool };
})();
