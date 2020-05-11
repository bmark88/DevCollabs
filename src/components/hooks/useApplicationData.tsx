import { useEffect, useState } from "react"
import axios from "axios"

export default function useApplicationData() {
  const [state, setState] = useState({
    groups: [],
  })

  useEffect(() => {
    fetchGroups()
  }, [])

  /**
   * @desc Get a users id from session json data
   * @return {id:interger}
   */
  const userId = JSON.parse(localStorage.getItem("session")).id

  /**
   * @desc gets all group names of a user
   * @return {array<[id:interger ,name:string]>} data
   */
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        console.log(response.data)
        setState({
          groups: response.data,
        })
      })
      .catch(error => console.log(error))
  }

  return {
    state,
  }
}
