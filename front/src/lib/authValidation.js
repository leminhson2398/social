import validator from 'validator'

const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
/**
 * at least one lowercase
 * at least one uppercase
 * at least one digit
 * at least one special
 * at least length of 8
 * NOTE: this regex is only applied to countries that have
 *       alphabet letters (a-z) in their language
 */

function loginValidaton({ email, password }) {
  let emailError = null, passwordError = null
  if (!validator.isEmail(email)) {
    emailError = "You must enter a valid email."
  }
  // test password
}

function passwordValidation(password) {
  if (!passwordRegx.test(password)) {
    return ''
  }
}

function signupValidaton({ username, email, password, passwordConfirm }) {
  let 
}

module.exports = {
  loginValidaton,
  signupValidaton,
}
