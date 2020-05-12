import { useEffect, useState } from "react"
import axios from "axios"

export default function useApplicationData() {
  const [state, setState] = useState({
    group: 0,
    groups: [],
    posts: [],
  })

  //get a users id from session json data. returns {id:interger}
  const userId = JSON.parse(localStorage.getItem("session")).id

  //gets all group names of a user. returns {array<[id:interger ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        return { group: response.data[0].id, groups: response.data }
      })
      .then(group => {
        axios
          .get(`http://localhost:3001/group/g/${group.group}`)
          .then(response => {
            setState({ ...state, posts: response.data, ...group })
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const setGroup = (groupId) => {
    console.log('setGroup', groupId)
      axios.get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group:groupId, posts: response.data})
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
