import React from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

interface Props {
  groups: object
  group: any
  setGroup: any
}

const Div = styled.div`
  border: solid;
  min-height: 500px;
  min-width: 250px;
  margin: 1em;
`;

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