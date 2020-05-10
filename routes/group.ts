// router.get("/", (req, res) => {
//   console.log('group root')
//   let user = JSON.parse(window.localStorage.getItem("user"))
//   dbHelpers.getGroups(user.id).then(data => res.send(data))
// })

const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.post("/:groupId/post/create", (req, res) => {
    //req.body should be JSON of { "userId" : id, "data": "string"}
    const { groupId } = req.params
    const { userId, data } = req.body
    dbHelpers.getSubscriptionsWithUser( userId, groupId).then(subscription => {
      if (subscription) {
        dbHelpers
        .createPost(groupId, userId, data)
        .then(post => res.send(post))
        .catch(() => res.status(400).send("Could not create post"))
      } else {
        res.send(null)
      }
    })

  })

  router.get("/:group_id", (req, res) => {
    const { group_id } = req.params
    dbHelpers.getPostWithGroupID(group_id).then(queryResults => {
      console.log(queryResults)
      const { username, data, created_at, avatar_image } = queryResults
      console.log(username, data, created_at, avatar_image)

      res.send({
        username,
        data,
        created_at,
        avatar_image,
      })
    })
  })

  router.post("/:name", (req, res) => {
    const subscription = { group_id: "", user_id: "" }
    dbHelpers
      .addGroup(req.params.name)
      .then(group => {
        subscription.group_id = group.id
        console.log("1-subscription group", subscription)
      })
      .then(() => {
        dbHelpers
          .getUserWithEmail("alice@hotmail.com")
          .then(user => {
            subscription.user_id = user.id
            console.log("2-subscription user", subscription)
          })
          .then(() => {
            console.log("3-subscription object: ", subscription),
              dbHelpers
                .addSubscription(subscription)
                .then(result => console.log("result ", result))
          })
      })
  })

  router.delete("/delete/:group_id", (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.id
    const groupId = req.params.group_id

    dbHelpers.getSubscriptionsWithUser(userId, groupId).then(subscription => {
      console.log("2-subscription", subscription)
      if (subscription.is_admin === true) {
        dbHelpers.deleteGroup(groupId).then(data => console.log(data))
      } else {
        throw new Error("error: unable to delete group")
      }
    })
  })

  router.delete("/:group_id/leave", (req, res) => {
    const userID = JSON.parse(localStorage.getItem("session")).id
    const groupID = req.params.group_id

    dbHelpers.removeSubscription(userID, groupID)
  })

  return router
}