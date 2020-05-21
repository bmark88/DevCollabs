import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../helpers/interfaces"

export default function useApplicationData() {
  const [state, setState] = useState<User>({
    group: 0,
    groups: [],
    posts: [],
  })
  const [postCount, setPostCount] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [news, setNews] = useState([]);

  //get a users id from session json data. returns {id:number}
  const userId: number = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem("session") || "{}").id

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`https://dev-collabs-backend.herokuapp.com/group/u/${userId}`)
      .then(response => {
        axios
        .get(`https://dev-collabs-backend.herokuapp.com/group/g/${response.data[0].id}`)
        .then(data => {
          setState({ ...state,
             posts: data.data,
             group: response.data[0].id,
             groups: response.data,
          })
        })
        .catch(error => error.stack)
      })
      .catch(error => error.stack)
  }

  const setGroup = (groupId: number) => {
    axios
      .get(`https://dev-collabs-backend.herokuapp.com/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group: groupId, posts: response.data })
      })
      .catch(error => error.stack)
  }

  const fetchUserPosts = (userID :number) => {
    axios
      .get(`https://dev-collabs-backend.herokuapp.com/profile/${userID}`)
      .then(response => setPostCount(response.data.totalPosts.count))
      .catch(e => e.stack);
  };

  const fetchUserSubscriptions = (userID :number) => {
    axios
    .get(`https://dev-collabs-backend.herokuapp.com/profile/${userID}`)
    .then(response => setSubscriptions(response.data.userSubscriptions))
    .catch(e => e.stack);
  }

  const fetchNews = () => {
    axios
      .get('https://hn.algolia.com/api/v1/search?tags=front_page')
      .then(res => {
        setNews(res.data.hits)
      })
      .catch(e => e.stack)
  };

  useEffect(() => {
    fetchGroups()
    fetchNews()
  }, [])

  return {
    state,
    setGroup,
    fetchGroups,
    fetchUserPosts,
    fetchUserSubscriptions,
    postCount,
    subscriptions,
    fetchNews,
    news
  }
}
