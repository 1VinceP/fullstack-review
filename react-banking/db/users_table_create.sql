CREATE TABLE Users
(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(180),
    email VARCHAR(180),
    img TEXT,
    auth_id TEXT
);