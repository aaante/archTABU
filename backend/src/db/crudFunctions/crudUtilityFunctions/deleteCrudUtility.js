export const deleteCrudUtility = (function() {
    const deleteRowReturningId = async function(
        client,
        tableName,
        columnName1,
        columnName2,
        value,
    ) {
        const result = await client.query(
            `
            DELETE FROM ${tableName}
            WHERE ${columnName1} = $1
            RETURNING ${columnName2};
            `,
            [value],
        );

        return result.rows[0];
    };

    return { deleteRowReturningId: deleteRowReturningId };
})();
