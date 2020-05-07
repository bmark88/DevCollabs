DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts
(
  id SERIAL PRIMARY KEY NOT NULL,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  data VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL
);