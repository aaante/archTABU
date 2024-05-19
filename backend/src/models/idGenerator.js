export const idGenerator = (function() {
    /* Query for MAX id number to get id number + 1 */
    /* Should be called inside transaction block */
    async function generateId(client, idColumn, tableName) {
        const maxId = await client.query(
            `SELECT MAX(${idColumn}) FROM ${tableName};`,
        );
        return maxId.rows[0].max + 1;
    }
    return { generateId: generateId };
})();
