import React, { ReactNode } from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

// import useGroupData from "../components/useGroupData"

interface Props {
  // children: ReactNode
  groups: object
  group: any
  setGroup: any
}

const Div = styled.div`
  border: solid;
  height: 800px;
  min-width: 250px;
  float: left;
  margin: 1em;
  // width: 30%;

  @media (max-width: 1000px) {
    background-color: blue;
  }
`

export default function GroupList({group, groups, setGroup }: Props) {
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
