export const idGenerator = (function() {
    /* Query for MAX id number to get id number + 1 */
    /* Should be called inside transaction block */
    async function generateId(client, idColumnName, tableName) {
        const maxId = await client.query(
            `SELECT MAX(${idColumnName}) FROM ${tableName};`,
        );
        return maxId.rows[0].max + 1;
    }
    return { generateId: generateId };
})();
