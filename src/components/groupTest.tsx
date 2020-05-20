import React from "react"
import { useEffect, useState } from "react"

import axios from "axios"

function GroupTestElement(props) {

   const { name, id } = props.group
   const userId = JSON.parse(localStorage.getItem("session") || "{}")
   .id
   const [sub, setSub] = useState(false)
   const [disable, setDisable] = useState(false)

   useEffect(()=>{
      axios({
         method: 'get',
         url: `http://localhost:3001/group/${id}/${userId}`
      }).then(isSubbed => {
         setSub(isSubbed.data)
      })
   },[])
   
   const handleSub = () => {
     
      const data = {userId}
      sub ? (
         axios({
            method: "delete",
            url: `http://localhost:3001/group/subscription/delete/${id}`,
            data: data,
         })
         .then(() => {
            console.log('unsub success')
         })
         .catch(e => e.stack)
      )
      : (
         axios({
            method: "post",
            url: `http://localhost:3001/group/subscription/${id}`,
            data: data,
         })
         .then(() => {
            console.log('sub success')
         })
         .catch(e => e.stack)   
      )
      setSub(!sub)
      setDisable(true)
   }
   
   return (
      <div>
         <p key={id}>{name}</p>
         <button onClick={handleSub}>{sub ? '-' : '+'}</button>
      </div>
   )

}

export default function Test() {
  const [allGroups, setAllGroups] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/group/public").then(data => {
      setAllGroups(data.data)
    })
  }, [])

  const List = allGroups.map((group, index :number) => {
      return <GroupTestElement key={index} group={group} />
  })

  return <div>{List}</div>
}
