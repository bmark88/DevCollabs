import { useEffect, useState } from "react"
import axios from "axios"

export default function usePublic() {
  const [publicGroups, setPublic] = useState({
    groups: [],
  })
  const [usersList, setUsersList] = useState([]);

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchAllGroups = () => {
    axios
      .get(`http://localhost:3001/group/public`)
      .then(response => {
        setPublic({ ...publicGroups, groups: response.data })
      })
      .catch(e => e.stack)
  }

  const fetchAllUsers = () => {
    axios
      .get(`http://localhost:3001/users`)
      .then(response => {
        // console.log('fetchAllUsers response ==>', response.data)
        setUsersList(response.data);
      })
      .catch(e => e.stack);
  }

  useEffect(() => {
    fetchAllGroups();
    fetchAllUsers();
  }, [])

  return {
    publicGroups,
    usersList
  }
}
