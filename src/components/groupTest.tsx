import React from "react"
import { useEffect, useState } from "react"

import axios from "axios"

function GroupTestElement(props) {

   const { name, id } = props.group
   const userId = JSON.parse(localStorage.getItem("session") || "{}")
   .id
   const [sub, setSub] = useState(false)
   const [disable, setDisable] = useState(false)
   // console.log('sub true or not', props.sub)
   // console.log("from grouptestelent", name)
   // console.log("from goruptestele", id)
   // console.log('-------------')

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
         .catch(() => console.log('unsub unsuccess'))
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
         .catch(() => console.log('sub unsuccess') )   
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
//   const [groupBelong, setGroupBelong] = useState([])
  useEffect(() => {
    const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
      .id
   //  console.log("userID", userId)
    axios.get("http://localhost:3001/group/public").then(data => {
      // console.log(data.data)
      setAllGroups(data.data)
    })
//     axios.get(`http://localhost:3001/group/u/${userId}`).then(data => {
//       const groupNameBelongArr = data.data.map(group => {
//          return group.name
//        })
//        console.log("groupArr", groupNameBelongArr)
//       setGroupBelong(groupNameBelongArr)
//     })
  }, [])

  const List = allGroups.map((group, index :number) => {
      // if (groupBelong.includes(group.name)) {
      //    return <GroupTestElement group={group} sub={true} />
      // } else {
      //   
      // }
      // console.log('group =>' , group)
      return <GroupTestElement key={index} group={group} />
  })

  return <div>{List}</div>
}
