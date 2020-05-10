import { useEffect, useState } from "react"
import axios from "axios"

export default function useApplicationData() {
  const [state, setState] = useState({
    groups: [],
  })

  /**
   * @desc Get a users session json data.
   * @param {username:string, email:string, id:interger ,token:string} session
   * @return {object<{}>} A promise to the user.
   */

  useEffect(() => {
    fetchGroups()
  }, [])

  //     const groups = () => {
  //       axios({
  //         method: "get",
  //         url: "http://localhost:3001/group/u/1",
  //         data: session.id,
  //       }).then(response => {
  //         console.log("response.response =>", response.data)
  //         // setGroups(response.data)
  //       })
  //     }
  //     return () => groups()
  //   }, [groups])
  // setGroups(groups)
  const session = JSON.parse(localStorage.getItem("session"))
  const fetchGroups = () => {
    Promise.all([axios.get(`http://localhost:3001/group/u/1`)])
      .then(([response]) => {
          console.log(response.data)
        setState({
          groups: response.data,
        })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    state,
  }
}
