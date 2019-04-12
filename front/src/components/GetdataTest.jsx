import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const query = gql`
  query {
    users {
      id
      username
      firstName
      email
    }
  }
`
// const addUser = gql`
//   mutation {
//     createUser()
//   }
// `

export default class Test extends React.Component {
  render() {
    return (
      <Query query={query}>
        {({ data, loading, refetch }) => loading ? (
          <p>loading users...</p>
        ) : (
            <UserList data={data} refetch={refetch}/>
          )}
      </Query>
    )
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { data, refetch } = this.props
    let a = data.users.map((u, i) => (
      <div key={i + 1}>
        <p>{u.username}</p>
        <p>{u.email}</p>
      </div>
    ))
    return (
      <div>
        <button onClick={() => refetch()}>Refetch</button>
        {a}
      </div>
    )
  }
}
