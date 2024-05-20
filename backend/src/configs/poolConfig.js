import pg from "pg";
const { Pool } = pg;

export const POOL_CONFIG = (function() {
    const _poolData = {
        user: "antesusic",
        password: "postgres",
        host: "127.0.0.1",
        port: 5432,
        database: "archtabu",
        max: 10,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 0,
    };

    const _pool = new Pool(_poolData);

    const getPool = function() {
        return _pool;
    }

    return { pool: getPool };
})();
