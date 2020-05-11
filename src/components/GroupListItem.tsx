import React from "react"

interface Props {
  // children: ReactNode
  group: object
  groups: object
  setGroup: any
  name: string
  id: any
}

export default function DayListItem({ id, name, setGroup } :Props) {
  return <div onClick={() => setGroup(id)}> {name}</div>
}
