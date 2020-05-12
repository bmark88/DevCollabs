import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import * as moment from 'moment';

const ENDPOINT = "http://localhost:3001/"

export default function socketChat(roomName) {
  const roomId = roomName
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [connection, setConnection] = useState({})
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    if(localStorage.getItem('session')) {
      const userName = JSON.parse(localStorage.getItem('session')).username
      setUser(userName)

    
      //server connection
      const conn = socketIOClient(ENDPOINT)
      setConnection(conn)
      conn.emit('join', { userName, roomId })
      
      //users
      conn.on("displayUsers", (data: any) => {
        console.log('users', data)
        setUsers([...data.users])
      })

      conn.on("message", (data: any) => {
        let now: string = moment().format('lll');
        data.date = now
        setMessages(prev => [...prev, data])
        console.log(data)
      })

    }

  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(connection)
    console.log(event.target.message.value)
    connection.emit("message", { user, message: event.target.message.value, roomId })
  }

  return { handleSubmit, users, messages }
}

