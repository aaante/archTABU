UPDATE people
SET name_id = (
SELECT name_id
    FROM names
    WHERE name = 'Ante'
)
WHERE person_id = 2
RETURNING name_id;
