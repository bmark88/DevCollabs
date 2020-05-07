INSERT INTO chat_messages
  (group_id, user_id, text, created_at)
VALUES
  (1, 1, 'test text for chat messages', NOW());
  
INSERT INTO chat_messages
  (group_id, user_id, text, created_at)
VALUES
  (1, 2, 'reply to test text 1', NOW());