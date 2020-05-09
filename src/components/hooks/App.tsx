import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import * as moment from 'moment';

const ENDPOINT = "http://localhost:3002"

export default function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [connection, setConnection] = useState({})
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    //server connection
    const conn = socketIOClient(ENDPOINT)
    setConnection(conn)
    
    conn.on("intial", (data: any) => {
      setUser(data.user)
      setUsers([...data.users])
    })
    
    conn.on("users", (data: any) => {
      setUsers([...data.users])
    })
    
    conn.on("message", (data: any) => {
      let now: string = moment().format('lll');
      data.date = now
      setMessages(prev => [...prev, data])
      console.log(data)
    })
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(connection)
    console.log(event.target.message.value)
    connection.emit("message", { user, message: event.target.message.value })
  }

  return { handleSubmit, users, messages }
}

