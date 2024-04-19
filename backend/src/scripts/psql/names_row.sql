WITH names_row AS (
    SELECT name_id FROM names
    WHERE name_id = (
        SELECT name_id FROM people
        WHERE person_id = 1
    )
)

SELECT * FROM names_row;
