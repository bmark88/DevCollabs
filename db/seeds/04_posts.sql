INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (1, 1, 'test post in group 1', 'https://744025.smushcdn.com/1245953/wp-content/uploads/2019/07/is-coding-hard-to-learn.jpg?lossy=1&strip=1&webp=1', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (2, 3, 'test post in group 2', 'https://image.shutterstock.com/image-vector/banner-hackathon-design-sprintlike-event-260nw-1418226719.jpg', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (3, 6, 'test post in group 3', 'https://code.visualstudio.com/assets/docs/languages/javascript/overview.png', NOW()::TIMESTAMP);


INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (1, 2, 'test post in group 1', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (2, 1, 'test post in group 2', NOW()::TIMESTAMP);