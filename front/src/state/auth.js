import validator from 'validator'
import React from 'react'
import PasswordValidation from '../components/auth/AuthValidation'

export const authState = {
  loginUsername: '', // 0
  loginPassword: '', // 1
  signupUsername: '', // 2
  signupEmail: '', // 3
  signupPassword: '', // 4
  signupPasswordConfirm: '', // 5
  loginPasswordType: 'password', // 6
  signupPasswordType: 'password', // 7
  signupPasswordConfirmType: 'password', // 8
  loginCheck: false, // 9
  signupCheck: false, // 10
  loginUsernameValidation: '', // 11
  loginPasswordValidation: '', // 12
  signupUsernameValidation: '', // 13
  signupEmailValidation: '', // 14
  signupPasswordValidation: { component: null, error: null }, // 15
  signupPasswordConfirmValidation: '', // 16
}

export function reducer(state, action) {
  console.log('authState: ', state)
  // action id is number
  switch (action.type) {
    case 0:
      var loginUsernameValidation = Boolean(action.value) ? { loginUsernameValidation: null } : { loginUsernameValidation: 'User name is required' }
      return Object.assign({}, state, { loginUsername: action.value, ...loginUsernameValidation })
    case 1:
      var loginPasswordValidation = Boolean(action.value) ? { loginPasswordValidation: null } : { loginPasswordValidation: 'Password is required' }
      return Object.assign({}, state, { loginPassword: action.value, ...loginPasswordValidation })
    case 2:
      var signupUsernameValidation
      if (!action.value.length) {
        signupUsernameValidation = { signupUsernameValidation: 'User name is required' }
      } else if (0 < action.value.length && action.value.length < 6) {
        signupUsernameValidation = { signupUsernameValidation: 'User name should be at least 6 characters' }
      } else {
        signupUsernameValidation = { signupUsernameValidation: null }
      }
      return Object.assign({}, state, { signupUsername: action.value, ...signupUsernameValidation })
    case 3:
      var signupEmailValidation
      if (!validator.isEmail(action.value) && action.value.length > 0) {
        signupEmailValidation = { signupEmailValidation: 'Please enter a valid email' }
      } else if (!action.value.length) {
        signupEmailValidation = { signupEmailValidation: 'Email is required' }
      } else if (validator.isEmail(action.value)) {
        signupEmailValidation = { signupEmailValidation: null }
      }
      return Object.assign({}, state, { signupEmail: action.value, ...signupEmailValidation })
    case 4:
      // var signupPasswordValidation = { signupPasswordValidation: PasswordValidation(action.value) }
      // returns signupPasswordValidation as an object
      return Object.assign({}, state, { signupPassword: action.value, signupPasswordValidation: PasswordValidation(action.value) })
    case 5:
      var signupPasswordConfirmValidation
      if (state.signupPassword) {
        if (state.signupPassword !== action.value) {
          signupPasswordConfirmValidation = { signupPasswordConfirmValidation: 'Passwords do not match' }
        } else {
          signupPasswordConfirmValidation = { signupPasswordConfirmValidation: null }
        }
      } else {
        signupPasswordConfirmValidation = { signupPasswordConfirmValidation: null }
      }
      return Object.assign({}, state, { signupPasswordConfirm: action.value, ...signupPasswordConfirmValidation })
    case 6:
      return Object.assign({}, state, { loginPasswordType: state.loginPasswordType === 'password' ? 'text' : 'password' })
    case 7:
      return Object.assign({}, state, { signupPasswordType: state.signupPasswordType === 'password' ? 'text' : 'password' })
    case 8:
      return Object.assign({}, state, { signupPasswordConfirmType: state.signupPasswordConfirmType === 'password' ? 'text' : 'password' })
    case 9:
      return Object.assign({}, state, { loginCheck: !state.loginCheck })
    case 10:
      return Object.assign({}, state, { signupCheck: !state.signupCheck })

    default:
      return state
  }
}
