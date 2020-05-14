import React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

//hooks
import useApplicationData from "./hooks/useApplicationData"
import publicUse from "../components/hooks/publicUse"

//components
import Button from "./Button"

//helpers
import subscribeList from "../helpers/selectors"

interface Props {}

export default function IndexGroupsList({}: Props) {
  //state includes list of users groups state= { groups{[id:number ,name:string], ...} }
  //   const { subscribeList } = subscribeList()
  console.log(subscribeList)
  //   const { state } = useApplicationData()
  //   const { groups } = state
  const { publicGroups } = publicUse()
  const unsubscribe = "-"
  const toSubscribe = "+"

  const [groupState, setGroupState] = useState({})
  const subscribeListResult= subscribeList();
  

  const groupsArr = publicGroups.groups
  useEffect(() => {
    groupsArr.forEach(group => {
      let button = toSubscribe
      if (subscribeListResult.includes(group.id)) {
        console.log("HERE")
        button = unsubscribe
        setGroupState(prev => ({ ...prev, [group.id]: true }))
      } else {
        setGroupState(prev => ({ ...prev, [group.id]: false }))
      }
    })
  }, [publicGroups, subscribeListResult])

  const groupsList = groupsArr.map(group => {
    let button = toSubscribe
    if (subscribeListResult.includes(group.id)) {
      console.log("HERE")
      button = unsubscribe
    }
    // groups.map(subscribedGroup => {
    //   if (subscribedGroup.id === group.id) setButton(unsubscribe)
    // })
    const onSubmitFunction = (event: any) => {
      console.log("onSubmit")
      event.preventDefault()
      const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
        .id
      const data = { userId }

      const groupId = group.id
      console.log("userId, groupId", userId, groupId)
      if (button === unsubscribe) {
        console.log("unsubscribe")
        axios({
          method: "delete",
          url: `http://localhost:3001/group/subscription/delete/${groupId}`,
          data: data,
        }).then(res => {
          console.log(res.data)
        })
      }
      if (button === toSubscribe) {
        console.log("toSubscribe")

        axios({
          method: "post",
          url: `http://localhost:3001/group/subscription/${groupId}`,
          data: data,
        }).then(res => {
          console.log(res.data)
        })
      }
    }
    return (
      //   <>
      <div>
        {group.name}
        <button onClick={onSubmitFunction}>{button}</button>
      </div>
      // </>
    )
  })
  return <div>{groupsList}</div>
}
