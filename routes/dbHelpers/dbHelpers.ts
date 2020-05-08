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
      .then(res => res.rows[0])
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

  const changeUserInfo = (user) => {
    const userID = 1; // change later to use logged in user's ID
    
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
          userID
        ]
      )
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack))
  }

  return { getUserWithEmail, addUser, getGroup, addGroup, getPostWithGroupID, changeUserInfo }
}