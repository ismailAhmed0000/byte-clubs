000001_create_users_table.up.sql :

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    name TEXT,
    email TEXT,
    password TEXT
);


CREATE INDEX idx_users_deleted_at On users(deleted_at);