import { gql } from 'apollo-boost'

const GET_USERS = gql`
  # this query is used to get all users
  query {
    users {
      id
      email
      username
      dateJoined
    }
  }
`

const GET_USER = gql`
  # this query retrieves one user
  query Input()
`



const queries = {
  get_users: GET_USERS,
}

export function queryStore(name) {
  name = name.toLowerCase()
  if (Object.keys(queries).indexOf(name) === -1) {
    console.error(`have no '${name}'`)
  } else {
    return queries[name]
  }
}
