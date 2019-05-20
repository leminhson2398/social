import { gql } from 'apollo-boost'


const TOKEN_AUTH = gql`
  # This mutstion is used for log an user into system
  # it returns a token string.
  mutation AuthUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

const VERIFY_TOKEN = gql`
  # This mutation used for verifying token is valid or not
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`

const CREATE_USER = gql`
  # this mutation is used to create a new user
  mutation CreateUser($email: String!, $username: String!, $password1: String!, $password2: String!) {
    createUser(email: $email, username: $username, password1: $password1, password2: $password2) {
      user {
        username
        email
        id
        dateJoined
      }
    }
  }
`

const mutations = {
  token_auth: TOKEN_AUTH,
  verify_token: VERIFY_TOKEN,
  refresh_token: REFRESH_TOKEN,
  create_user: CREATE_USER,
}

export function mutationStore(name) {
  name = name.toLowerCase()
  if (Object.keys(mutations).indexOf(name) === -1) {
    console.error(`have no '${name}'`)
  } else {
    return mutations[name]
  }
}

