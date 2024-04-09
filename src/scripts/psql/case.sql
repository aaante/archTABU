SELECT name_id,
    CASE WHEN COUNT(name_id)=1 THEN TRUE 
        ELSE FALSE
    END
FROM people
GROUP BY name_id;

