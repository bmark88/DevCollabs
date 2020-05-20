INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (1, 1, 'Check this out!', 'https://744025.smushcdn.com/1245953/wp-content/uploads/2019/07/is-coding-hard-to-learn.jpg?lossy=1&strip=1&webp=1', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (2, 3, 'Hacking for life', 'https://image.shutterstock.com/image-vector/banner-hackathon-design-sprintlike-event-260nw-1418226719.jpg', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, image_url, created_at)
VALUES
  (3, 6, 'JavaScript', 'https://code.visualstudio.com/assets/docs/languages/javascript/overview.png', NOW()::TIMESTAMP);


INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (1, 9, 'Does anyone know how to to use websockets?', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (2, 1, 'TypeScript is the way to go', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (3, 3, 'Hacker News lastest article was insane.', NOW()::TIMESTAMP);

INSERT INTO posts
  (group_id, user_id, data, created_at)
VALUES
  (3, 3, 'I found a repo ', NOW()::TIMESTAMP);
