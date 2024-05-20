export const readUtility = (function() {
    async function getAverageColumnValue(client, columnName, tableName) {
        const averageColumnValue = await client.query(
            `
            SELECT ROUND(AVG(${columnName}))
            FROM ${tableName};
            `,
        );
        return averageColumnValue.rows[0].round;
    }

    return { getAverageColumnValue: getAverageColumnValue };
})();
