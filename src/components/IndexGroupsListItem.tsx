import React from "react"
import { useEffect, useState } from "react"

interface Props {
  group: any
  button: any
  onSubmitFunction: any
}

export default function IndexGroupsListItem({
  group,
  button: defaultButton,
  onSubmitFunction,
}: Props) {
  const unsubscribe = "-"
  const toSubscribe = "+"

  const [button, setButton] = useState(defaultButton)
  const handleClick = e => {
    if (button === unsubscribe) {
      setButton(toSubscribe)
    } else {
      setButton(unsubscribe)
    }
    onSubmitFunction(e, group.id, button)
  }

  return (
    //   <>
    <div>
      {group.name}
      <button onClick={handleClick}>{button}</button>
    </div>
    // </>
  )
}
