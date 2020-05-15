import React from "react"
import { useState } from "react"
// import Icon from "@material-ui/icons"
import Icon from '@material-ui/core/Icon';
import { toast } from "react-toastify";

toast.configure();

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
      toast(`You have unsubscribe!`, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: false,
        pauseOnHover: false,
        hideProgressBar: true,
      })
    } else {
      setButton(unsubscribe)
      toast(`You have subscribed!`, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: false,
        pauseOnHover: false,
        hideProgressBar: true,
      })
    }
    onSubmitFunction(e, group.id, button)
  }

  return (
    <div>
      {group.name}
      <button onClick={handleClick}>{button}</button>
    </div>
  )
}
