// import state and reducer of auth
import { reducer as authReducer } from './Auth'

var initialState = {
  authState: {
    loginEmail: '',
    loginPassword: '',
    signupUsername: '',
    signupEmail: '',
    signupPassword: '',
    signupPasswordConfirm: '',
    loginPasswordType: 'password',
    signupPasswordType: 'password',
    signupPasswordConfirmType: 'password',
  },
}

module.exports = {
  authReducer,
}
