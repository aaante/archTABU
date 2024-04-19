import { SQLpool } from "../configs/SQLpool.js";

/* Query for MAX id number to get id number + 1 */
/* Should be called inside transaction block */
async function idGenerator(idName, tableName) {
    const MAXid = await SQLpool.query(
        `SELECT MAX(${idName}) FROM ${tableName};`,
    );
    return MAXid.rows[0].max + 1;
}

export { idGenerator };
