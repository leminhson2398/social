// import validator from 'validator'
import { withStyles } from '@material-ui/core/styles'

/**
 * at least one lowercase
 * at least one uppercase
 * at least one digit
 * at least one special
 * at least length of 8
 * NOTE: this regex is only applied to countries that have
 *       alphabet letters (a-z) in their language
 */

const style = () => ({
  wrong: {
    color: '#559004',
    fontSize: 12,
    fontWeight: 'thin',
  },
  right: {
    color: '#af0000',
    fontSize: 12,
    fontWeight: 'thin',
  },
})

const fullCases = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const partsObject = {
  'one uppercase character': /[A-Z]{1,}/,
  'one lowercase character': /[a-z]{1,}/,
  'one digit': /[0-9]{1,}/,
  'one special character': /[!"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]{1,}/,
  'atleast 8 characters': /.{8,}/,
}

export default withStyles(style)(function PasswordValidation(props) {
  let { classes: { right, wrong }, password } = props
  password = password.trim()

  if (fullCases.test(password)) {
    // your password meets all the requirements in the first go
    return (
      <ul>
        {Object.keys(partsObject).map((item, index) => <li className={right} key={index}>{item}</li>)}
      </ul>
    )
  }
  // otherwise, test one by one
  return (
    <ul>
      {Object.keys(partsObject).map((item, index) => (
        <li className={partsObject[item].test(password) ? right : wrong} key={index}>{item}</li>
      ))}
    </ul>
  )
})
