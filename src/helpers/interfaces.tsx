export interface Group {
  id: number
  name: string
}
export interface Post {
  id: number
  group_id: number
  user_id: number
  created_at: number
}
export interface User {
  group: number
  groups?: Group[]
  posts?: Post[]
}