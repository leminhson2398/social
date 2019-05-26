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
}

export function reducer(state, action) {
  console.log('authState: ', state)
  // action id is number
  switch (action.type) {
    case 0:
      return Object.assign({}, state, { loginUsername: action.value })
    case 1:
      return Object.assign({}, state, { loginPassword: action.value })
    case 2:
      return Object.assign({}, state, { signupUsername: action.value })
    case 3:
      return Object.assign({}, state, { signupEmail: action.value })
    case 4:
      return Object.assign({}, state, { signupPassword: action.value })
    case 5:
      return Object.assign({}, state, { signupPasswordConfirm: action.value })
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

