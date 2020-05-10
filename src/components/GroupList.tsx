import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  // children: ReactNode
  groups: object
}

const Div = styled.div`
  border: solid;
  height: 800px;
  width: 20%;
  float: left;
  margin: 1em;

`

export default function GroupList({ groups }: Props) {
  const GroupList = groups.map(group => {
    return <div>{group.name}</div>
  })
  return <Div>{GroupList}</Div>
}
