import { useEffect, useState } from "react"
import axios from "axios"

export default function publicUse() {
    const [state, setState] = useState({
        groups: [],
        posts: [],
      })

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchAllGroups = () => {
    axios
      .get(`http://localhost:3001/group/public`)
      .then(response => {
        console.log(response)
        setState({ ...state, groups: response.data})
      })
      .catch(error => console.log(error))
  }

useEffect(() => {
    fetchAllGroups()
  }, [])

  return {
    state
  }
}