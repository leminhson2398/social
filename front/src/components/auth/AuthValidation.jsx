import React from 'react'

/**
 * at least one lowercase
 * at least one uppercase
 * at least one digit
 * at least one special
 * at least length of 8
 * NOTE: this regex is only applied to countries that have
 *       alphabet letters (a-z) in their language
 */

function PasswordValidation(password) {

  const fullCases = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const partsObject = {
    'one uppercase character': /[A-Z]{1,}/,
    'one lowercase character': /[a-z]{1,}/,
    'one digit': /[0-9]{1,}/,
    'one special character': /[!"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]{1,}/,
    'atleast 8 characters': /.{8,}/,
  }

  if (fullCases.test(password)) {
    return {
      validationComponent: <ul>{Object.keys(partsObject).map((item, index) => <li style={{ fontSize: '12px', color: '#559004' }} key={index}>{item}</li>)}</ul>,
      error: false,
    }
  } else {
    return {
      validationComponent: <ul>{Object.keys(partsObject).map((item, index) => (<li style={{ fontSize: '12px', color: partsObject[item].test(password) ? '#559004' : '#f44336' }} key={index}>{item}</li>))}</ul>,
      error: true,
    }
  }
}

export default PasswordValidation
