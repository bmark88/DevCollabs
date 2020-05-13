import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../helpers/interfaces"

export default function useApplicationData() {
  const [state, setState] = useState<User | null>({
    group: 0,
    groups: [],
    posts: [],
  })

  //get a users id from session json data. returns {id:number}
  const userId: number = JSON.parse(localStorage.getItem("session") || "{}").id

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        setState({group: response.data[0].id, groups: response.data })
        return response.data[0].id 
      })
      .catch(error => console.log(error))
  }

  const fetchPosts = (groupId: number) => {
    console.log(groupId)
    //gets all group posts. returns array<[id:number ,group_id:number, user_id:number, created_at:time]>
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        console.log(response)

        setState({ ...state, group: groupId, posts: response.data, ...group })
      })
      .catch(error => console.log(error))
  }

  const setGroup = (groupId: number) => {
    console.log("setGroup", groupId)
    //TO DO: too wet, try to either use above or separate above
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group: groupId, posts: response.data })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchGroups().then(groupId=> {
      fetchPosts(groupId)
    })
  }, [])

  return {
    state,
    setGroup,
  }
}
