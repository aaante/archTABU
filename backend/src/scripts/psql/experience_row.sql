WITH experience_row AS (
    SELECT experience_id FROM experience
    WHERE experience_id = (
        SELECT experience_id FROM people
        WHERE person_id = 1
    )
)

SELECT * FROM experience_row;
