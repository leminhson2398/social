var authState = {
  loginEmail: '',
  loginPassword: '',
  signupUsername: '',
  signupEmail: '',
  signupPassword: '',
  signupPasswordConfirm: '',
  loginPasswordType: 'password',
  signupPasswordType: 'password',
  signupPasswordConfirmType: 'password',
  loginCheck: false,
  signupCheck: false,
}

function reducer(state, action) {
  // action id is number
  let { authState } = state
  // console.log('authstate', state)
  // switch (action.id) {
  //   case 0:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'loginEmail': action.value }) })
  //   case 1:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'loginPassword': action.value }) })
  //   case 2:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupUsername': action.value }) })
  //   case 3:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupEmail': action.value }) })
  //   case 4:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupPassword': action.value }) })
  //   case 5:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupPasswordConfirm': action.value }) })
  //   case 6:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'loginPasswordType': authState.loginPasswordType === 'password' ? 'text' : 'password' }) })
  //   case 7:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupPasswordType': authState.signupPasswordType === 'password' ? 'text' : 'password' }) })
  //   case 8:
  //     return Object.assign({}, state, { authState: Object.assign({}, authState, { 'signupPasswordConfirmType': authState.signupPasswordConfirmType === 'password' ? 'text' : 'password' }) })
  //   default:
  //     return state
  // }

  function renewAuthState(authState, id) {
    switch (id) {
      case 0:
        return Object.assign({}, authState, { loginEmail: action.value })
      case 1:
        return Object.assign({}, authState, { loginPassword: action.value })
      case 2:
        return Object.assign({}, authState, { signupUsername: action.value })
      case 3:
        return Object.assign({}, authState, { signupEmail: action.value })
      case 4:
        return Object.assign({}, authState, { signupPassword: action.value })
      case 5:
        return Object.assign({}, authState, { signupPasswordConfirm: action.value })
      case 6:
        return Object.assign({}, authState, { loginPasswordType: authState.loginPasswordType === 'password' ? 'text' : 'password' })
      case 7:
        return Object.assign({}, authState, { signupPasswordType: authState.signupPasswordType === 'password' ? 'text' : 'password' })
      case 8:
        return Object.assign({}, authState, { signupPasswordConfirmType: authState.signupPasswordConfirmType === 'password' ? 'text' : 'password' })
      case 9:
        return Object.assign({}, authState, { loginCheck: !authState.loginCheck })
      case 10:
        return Object.assign({}, authState, { signupCheck: !authState.signupCheck })

      default:
        return authState
    }
  }
  return Object.assign({}, state, { authState: renewAuthState(authState, action.id) })
}


module.exports = {
  reducer,
  authState,
}
