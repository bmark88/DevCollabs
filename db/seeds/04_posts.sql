INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (1, 1, { "test":"test post in group 1" }, NOW());

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (2, 3, { "test":"test post in group 3" }, NOW());

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (3, 6, { "test":"test post in group 3" }, NOW());