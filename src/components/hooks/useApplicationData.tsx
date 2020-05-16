import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../helpers/interfaces"
import { ThreeDRotationSharp } from "@material-ui/icons"

export default function useApplicationData() {
  const [state, setState] = useState<User>({
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
        axios
        .get(`http://localhost:3001/group/g/${response.data[0].id}`)
        .then(data => {
          setState({ ...state,
             posts: data.data,
             group: response.data[0].id,
             groups: response.data,
          })
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const fetchPosts = (groupId: number) => {
    //gets all group posts. returns array<[id:number ,group_id:number, user_id:number, created_at:time]>
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, posts: response.data })
      })
      .catch(error => console.log(error))
  }
  /*
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
*/

  //TO DO: too wet
  const setGroup = (groupId: number) => {
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group: groupId, posts: response.data })
      })
      .catch(error => console.log(error))
  }

  const fetchUserPosts = (userID :number) => {
    axios
      .get(`http://localhost:3001/profile/${userID}`)
      .then(response => {
        console.log('response from fetchUserPosts', response)
        return response
      })
      .catch(e => console.error('error!!', e.stack))
  }

  useEffect(() => {
    fetchGroups()
    // .then(groupId => {
    //   // console.log(groupId)
    //   fetchPosts(groupId)
    // })
  }, [])

  return {
    state,
    setGroup,
    fetchGroups,
    fetchUserPosts
  }
}
