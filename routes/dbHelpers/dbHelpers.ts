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

  return { getUserWithEmail, addUser }
}
