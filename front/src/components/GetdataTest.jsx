import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'


const AUTH_USER = gql`
  mutation AuthUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

class AuthUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }


  render() {
    let { username, password } = this.state

    return (
      <div>
        <input type="text"
          onChange={e => this.setState({ username: e.target.value })}
          value={username}
        /><br />
        <input type="password"
          onChange={e => this.setState({ password: e.target.value })}
          value={password}
        /><br />
        <Mutation mutation={AUTH_USER} variables={{ username: username, password: password }}>
          {(tokenAuth, { data, error, loading }) => (
            <div>
              <button onClick={tokenAuth}>Submit</button>
              {data ? console.log(data) : null}
              {error ? console.log(error) : null}
              {loading ? <p>Loading...</p> : null}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default AuthUser
