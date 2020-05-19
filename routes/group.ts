const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  // get all groups that exist. returns {array<[id:interger, name:string]>}
  router.get("/public", (req, res) => {
    dbHelpers.getAllGroups().then(data => {
      res.send(data)
    })
  })
  // get all groups ids and names of a user. returns {array<[id:interger, name:string]>}
  router.get("/u/:userId", (req, res) => {
    const { userId } = req.params
    dbHelpers.getGroupsNames(userId).then(data => {
      res.send(data)
    })
  })

  // get all groups posts. returns {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
  router.get("/g/:groupId", (req, res) => {
    const { groupId } = req.params
    dbHelpers.getGroupsPosts(groupId).then(data => {
      res.send(data)
    })
  })

  router.post("/:groupId/post/create", (req, res) => {
    const { groupId } = req.params
    const { userId, data } = req.body
    dbHelpers.getSubscriptionsWithUser(userId, groupId).then(subscription => {
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
      const { username, data, created_at, avatar_image } = queryResults

      res.send({
        username,
        data,
        created_at,
        avatar_image,
      })
    })
  })

  router.get("/:group_id/:user_id", (req, res) => {
    const userId = req.params.user_id
    const groupId = req.params.group_id

    dbHelpers.checkUserSubscription(userId, groupId).then(isSubbed => {
      res.send(isSubbed)
    })
  })

  router.delete("/delete/:group_id", (req, res) => {
    const userId = req.body.id
    const groupId = req.params.group_id

    dbHelpers.getSubscriptionsWithUser(userId, groupId).then(subscription => {
      console.log("2-subscription", subscription)
      if (subscription.is_admin === true) {
        dbHelpers
          .deleteGroup(groupId)
          .then(data => {
            res.send(data)
          })
          .catch(e => console.error(e))
      }
    })
  })

  router.delete("/:group_id/leave", (req, res) => {
    const userID = JSON.parse(localStorage.getItem("session") || "{}").id
    const groupID = req.params.group_id

    dbHelpers.removeSubscription(userID, groupID)
  })

  router.post("/subscription/:groupId", (req, res) => {
    const userId = req.body.userId
    const groupId = req.params.groupId
   
    dbHelpers.checkUserSubscription(userId, groupId).then(isUserSubscribed => {
      if (isUserSubscribed === true) {
        return console.log("User is already subscibed!")
      } else {

        dbHelpers
          .addSubscription(groupId, userId, false)
          .then(result => {
            res.send(result)
          })
          .catch(e => console.error(e))
      }
    })
  })

  router.delete("/subscription/delete/:groupId", (req, res) => {

    const userId = req.body.userId
    const groupId = req.params.groupId

    dbHelpers.checkUserSubscription(userId, groupId).then(isUserSubscribed => {
      if (isUserSubscribed === true) {
        dbHelpers
          .deleteSubscription(userId, groupId)
          .then(data => res.send(data))
          .catch((e) => console.error(e))
      }
    })
  })

  router.post("/g/create", (req, res) => {
    const { userId, groupName } = req.body
    console.log("userId ", userId)
    console.log("groupName ", groupName)
    dbHelpers
      .createGroupAndSubscription(userId, groupName)
      .then(data => {
        res.send(data)
      })
      .catch(e => console.error(e))
  })
  return router
}
