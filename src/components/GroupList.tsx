import React from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

// import useGroupData from "../components/useGroupData"

interface Props {
  // children: ReactNode
  groups: object[]
  group: object
  setGroup: any
}

const Div = styled.div`
  border: solid;
  height: 800px;
  width: 20%;
  float: left;
  margin: 1em;
`

export default function GroupList({groups, setGroup }: Props) {
  const GroupList = groups.map(group => {
    return (
      <GroupListItem
        key={group.id}
        id={group.id}
        name={group.name}
        setGroup={setGroup}
      />
    )
  })
  return <Div>{GroupList}</Div>
}
