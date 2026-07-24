CREATE TABLE folders (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name TEXT NOT NULL
);

CREATE INDEX idx_folders_deleted_at ON folders (deleted_at);
CREATE INDEX idx_folders_user_id ON folders (user_id);

ALTER TABLE recipes ADD COLUMN folder_id BIGINT REFERENCES folders(id);
CREATE INDEX idx_recipes_folder_id ON recipes (folder_id);