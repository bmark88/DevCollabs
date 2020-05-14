//- gets groups for a user getGroupsForUser(state, userId)
//- gets posts for a group (state, groupId)
//hooks
import useApplicationData from "../components/hooks/useApplicationData"
import publicUse from "../components/hooks/publicUse"

const subscribeList = () => {
  const { state } = useApplicationData()
  const { groups } = state

  const { publicGroups } = publicUse()

  const subscribeListArr = []

  const indexGroupsArr = publicGroups.groups
  for (let indexGroup of indexGroupsArr) {
    for (let userGroup of groups) {
      if (indexGroup.id === userGroup.id && !subscribeListArr.includes(userGroup.id)) {
        subscribeListArr.push(userGroup.id)
      }
    }
  }
//   const groupsList = indexGroupsArr.map(group => {
//     groups.map(indexGroup => {
//       if (indexGroup.id === group.id) {
//         subscribeListArr.push(indexGroup.id)
//       }
//     })
//   })
  console.log(subscribeListArr)
  return subscribeListArr
}
export default subscribeList
