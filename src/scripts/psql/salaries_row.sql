WITH salaries_row AS (
    SELECT salary_id FROM salaries
    WHERE salary_id = (
        SELECT salary_id FROM people
        WHERE person_id = 1
    )
)

SELECT * FROM salaries_row;

