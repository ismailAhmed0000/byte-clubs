000002_create_recipes_table.up.sql

CREATE TABLE recipes (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    user_id BIGINT REFERENCES users(id),
    source_url TEXT,
    platform TEXT,
    title TEXT,
    instructions TEXT,
    ingredients TEXT,
    share_token TEXT

)

CREATE INDEX idx_recipes_deleted_at ON recipes (deleted_at);
CREATE INDEX idx_recipes_user_id ON recipes(user_id);