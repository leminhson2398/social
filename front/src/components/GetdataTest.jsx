import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { mutationStore } from '../lib/mutaquery'


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
        <Mutation mutation={mutationStore('token_auth')} variables={{ username: username, password: password }}>
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
