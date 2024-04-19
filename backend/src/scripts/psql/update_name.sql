UPDATE names
SET name = 'Drago'
WHERE name_id = 3
RETURNING name;
