import { useEffect, useState } from "react"
import axios from "axios"
import useApplicationData from "./useApplicationData"

export default function publicUse() {
  const [publicGroups, setPublic] = useState({
    groups: [],
  }) //TODO change to array
  
//gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchAllGroups = () => {
    axios
      .get(`http://localhost:3001/group/public`)
      .then(response => {
        console.log(response)
        setPublic({ ...publicGroups, groups: response.data })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchAllGroups()
  }, [])

  return {
    publicGroups,
  }
}
