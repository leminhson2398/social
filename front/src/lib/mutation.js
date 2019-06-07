import { gql } from 'apollo-boost'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const TOKEN_AUTH = gql`
  # This mutstion is used for log an user into system
  # it returns a token string.
  mutation AuthUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export const VERIFY_TOKEN = gql`
  # This mutation used for verifying token is valid or not
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
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
