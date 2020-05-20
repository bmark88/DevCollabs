import { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import * as moment from "moment"

const ENDPOINT = "https://dev-collabs-backend.herokuapp.com/"

// interface Props {
//   userName: string
//   roomId: string
// }

export default function socketChat(roomId: string) {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [connection, setConnection] = useState({})
  const [messages, setMessages] = useState([])

  const conn = socketIOClient(ENDPOINT)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("session")) {
      const userName: string = JSON.parse(
        typeof window !== 'undefined' && window.localStorage.getItem("session") || "{}"
      ).username
      setUser(userName)

      //server connection
      setConnection(conn)
      conn.emit("join", { userName, roomId })

      //users
      conn.on("displayUsers", (data: any) => {
        setUsers([...data.users])
      })

      conn.on("message", (data: any) => {
        let now: string = moment().format("lll")
        data.date = now

        setMessages(prev => [...prev, data])
      })
    }

    return () => {
      if (typeof window !== 'undefined' && window.localStorage.getItem("session")) {
        const userName: string = JSON.parse(
          typeof window !== 'undefined' && window.localStorage.getItem("session") || "{}"
        ).username

        conn.emit("leaveRoom", { userName, roomId })
        conn.close()
      }
    }
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault()

    connection.emit("message", {
      user,
      message: event.target.message.value,
      roomId,
    })
    event.target.message.value = ""
  }

  const websocketIDE = value => {
    connection.emit("IDE", { value, roomId })
  }

  return { handleSubmit, users, messages, websocketIDE, conn }
}
