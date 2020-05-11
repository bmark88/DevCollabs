const bcrypt = require("bcrypt")

module.exports = db => {
  /**
   * Get a single user from the db given their email.
   * @param {String} user  The email of the user.
   * @return {Promise<{}>} A promise to the user.
   */
  const getUserWithEmail = function (email) {
    return db
      .query(
        `
        SELECT * FROM users
        WHERE email=$1
        LIMIT 1;
        `,
        [email]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows[0]
      })
  }
  /**
   * Add a new user to the database.
   * @param {{first_name: string, last_name:string, password: string, email: string}} user
   * @return {Promise<{}>} A promise to the user.
   */
  const addUser = function (user) {
    return db
      .query(
        `
        INSERT INTO users
        (username, email, password, avatar_image)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `,
        [
          user.username,
          user.email,
          bcrypt.hashSync(user.password, 12),
          user.avatar,
        ]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows[0]
      })
      .catch(e => null)
  }
  /**
   * Get a single user from the db given their email.
   * @param {Interger} group_id  group id
   * @return {Promise<{}>} A promise to the user.
   */
  const getPostWithGroupID = function (group_id) {
    return db
      .query(
        `
        SELECT posts.* , users.username, users.avatar_image FROM posts
        JOIN users ON users.id = posts.user_id
        WHERE posts.group_id = $1
        `,
        [group_id]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows[0]
      })
  }

  /**
   * Get a groups data from db using groupId.
   * @param {{integer}} groupId
   * @return {Promise<{}>} A promise to the user.
   */
  const getGroup = function (groupId) {
    return db
      .query(
        `
        SELECT * FROM groups
        WHERE groups.id = $1
        LIMIT 1;
        `,
        [groupId]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows[0]
      })
  }

  /**
   * Get all groups data from db using userId.
   * @param {{integer}} userId
   * @return {array<[id:interger, name:string]>} 
   */
  const getGroupsNames = function (userId) {
    return db
      .query(
        `
        SELECT groups.id, groups.name
        FROM subscriptions
        JOIN groups ON group_id = groups.id 
        WHERE user_id = $1;
        `,
        [userId]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows
      })
  }

  /**
   * Add a group to db.
   * @param {{string}} name
   * @return {Promise<{}>} A promise to the user.
   */
  const addGroup = function (name) {
    return db
      .query(
        `
      INSERT INTO groups
      (name)
      VALUES
      ($1)
      RETURNING *;
      `,
        [name]
      )
      .then(res => res.rows[0])
      .catch(e => null)
  }
  const checkForUser = function (username) {
    return db
      .query(
        `
        SELECT * FROM users
        WHERE username = $1
        `,
        [username]
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows[0]
      })
  }

  /**
   * Add a subscription to db using localstorage session to get userId.
   * @param {{group_id: integer, user_id:interger}} subscription
   * @return {Promise<{}>} A promise to the user.
   */
  const addSubscription = function (subscription) {
    return db
      .query(
        `
    INSERT INTO subscriptions
    (group_id, user_id, is_admin)
    VALUES
    ($1, $2, true)
    RETURNING *;
    `,
        [subscription.group_id, subscription.user_id]
      )
      .then(res => res.rows[0])
      .catch(e => null)
  }

  const removeSubscription = (userID, groupID) => {

    return db
      .query(`
        DELETE FROM subscriptions
        WHERE user_id = $1
        AND group_id = $2 
      `,
      [userID, groupID]
      )
      .then(res => res.rows[0])
      .catch(e => console.error('error ===>', e.stack))
  };

  const changeUserInfo = user => {
    return db
      .query(
        `
        UPDATE users
        SET username = $1, email = $2, password = $3, avatar_image = $4
        WHERE id = $5
        RETURNING *;
        `,
        [
          user.username,
          user.email,
          user.password, //this should use bcrypt.hashSync on real passwords
          user.avatar,
          user.id
        ]
      )
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack))
  }

  /**
   * Delete a group using groupId.
   * @param {{interger}} group_id
   * @return {Promise<{}>} A promise to the user.
   */
  const deleteGroup = group_id => {
    return db
      .query(
        `
        DELETE FROM groups
        WHERE id = $1
        `,
        [group_id]
      )
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack))
  }

  /**
   * Get a subscription of a user using userId and groupId.
   * @param {{interger}} user_id 
   * @param {{interger}} group_id
   * @return {Promise<{}>} A promise to the user.
   */
  const getSubscriptionsWithUser = (user_id, group_id) => {
    return db
      .query(
        `
      SELECT * FROM subscriptions
      WHERE user_id = $1 
      AND group_id = $2
      LIMIT 1;
        `,
        [user_id, group_id]
      )
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack))
  }

  const createPost = (group_id, user_id, data) => {
    return db.query(
      `
      INSERT INTO posts 
      (group_id, user_id, data, created_at)
      VALUES
      ($1 , $2, $3, NOW())
      RETURNING *;
      `, [group_id, user_id, data]
    )
    .then(res => res.rows[0])
    .catch(e => e)

  }

  return {
    getUserWithEmail,
    addUser,
    getGroup,
    getGroupsNames,
    addGroup,
    getPostWithGroupID,
    changeUserInfo,
    deleteGroup,
    getSubscriptionsWithUser,
    addSubscription,
    createPost,
    removeSubscription,
    checkForUser,
  }
}
