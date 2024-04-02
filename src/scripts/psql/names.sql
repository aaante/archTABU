-- Returns name_id on conflict
WITH row AS (
    INSERT INTO names (name)
    VALUES ('Luka')
        ON CONFLICT
        DO NOTHING
    RETURNING name_id
)
SELECT * FROM row
UNION
SELECT name_id FROM names
WHERE name = 'Luka';

