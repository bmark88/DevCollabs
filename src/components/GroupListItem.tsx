import React from "react"
import styled from "styled-components"

interface Props {
  group: object
  groups: object
  setGroup: any
  name: string
  id: any
}

const Li = styled.li`
  list-style: none
`;

export default function DayListItem({ id, name, setGroup } :Props) {
  return <Li onClick={() => setGroup(id)}> {name}</Li>
}
