import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData() {


  const [state, setState] = useState({
    group: 0,
    groups: [],
    posts: {}
  })

  useEffect(() => {
    fetchGroups()
  }, [])

  //get a users id from session json data. returns {id:interger}
  const userId = JSON.parse(localStorage.getItem('session')).id

  //gets all group names of a user. returns {array<[id:interger ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        console.log(response.data)
        setState({...state,
          group: response.data[0],
          groups: response.data,
        })
      })
      .catch(error => console.log(error))
  }

  return {
    state,
  }
}
