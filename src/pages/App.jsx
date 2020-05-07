import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3001"

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [connection, setConnection] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    //server connection
    const conn = socketIOClient(ENDPOINT)
    setConnection(conn)

    //connection is opened
    conn.on("intial", data => {
      console.log(data)
      setUser(data.user)
      setUsers([...data.users])
    })

    // runs a callback on users
    conn.on("users", data => {
      console.log("ON USERS")
      setUsers([...data.users])
    })

    //called when a message is received from the server
    //runs a cb on message event
    conn.on("message", data => {
      setMessages(prev => [...prev, data])
      console.log(messages)
      console.log(data)
    })
  }, [])

  //messaging
  const handleSubmit = evt => {
    evt.preventDefault()
    console.log(connection)
    console.log(evt.target.message.value)
    connection.emit("message", { user, message: evt.target.message.value })
  }

  return (
    <div className="app">
      {users.map(u => (
        <li>{u}</li>
      ))}
      {messages.map(msg => (
        <li>
          <b>{msg.user}:</b>
          {msg.message}
        </li>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
