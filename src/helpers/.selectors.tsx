const subscribeList = (state, publicGroups) => {

  //contains users group list 
  const { groups } = state

  const subscribeListArr = []

  const indexGroupsArr = publicGroups.groups
  for (let indexGroup of indexGroupsArr) {
    for (let userGroup of groups) {
      if (indexGroup.id === userGroup.id && !subscribeListArr.includes(userGroup.id)) {
        subscribeListArr.push(userGroup.id)
      }
    }
  }

  return subscribeListArr
}
// export default subscribeList
