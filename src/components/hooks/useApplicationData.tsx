import { useEffect, useState } from "react"
import axios from "axios"
import {User} from "../../helpers/interfaces"

export default function useApplicationData() {

  const [state, setState] = useState<User | null>({
    group: 0,
    groups: [],
    posts: [],
  })

  //get a users id from session json data. returns {id:number}
  const userId: number = JSON.parse(localStorage.getItem("session") || '{}').id

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        return { group: response.data[0].id, groups: response.data }
      })
      .then(group => {
        //gets all group posts. returns array<[id:number ,group_id:number, user_id:number, created_at:time]>
        axios
          .get(`http://localhost:3001/group/g/${group.group}`)
          .then(response => {
            setState({ ...state, posts: response.data, ...group })
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const setGroup = (groupId: number) => {
    console.log('setGroup', groupId)
    //TO DO: too wet, try to either use above or separate above
    axios.get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group: groupId, posts: response.data })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    state,
    setGroup,
  }
}
