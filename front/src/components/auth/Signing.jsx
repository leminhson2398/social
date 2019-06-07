import React, { useState, useReducer, Fragment, useMemo } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SocialButton from '../button/social/Social'
import CustomInput from '../customInput/CustomInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
// icons
import { Visibility, VisibilityOff } from '@material-ui/icons'
// custom style
import authStyle from './authStyle'
import { authState, reducer } from '../../state/auth'
// apollo graphql
import { TOKEN_AUTH, VERIFY_TOKEN, SIGNUP_USER } from '../../lib/mutation'
import { Mutation } from 'react-apollo'


function Signing() {

  const classes = makeStyles(authStyle)()

  // set initial tab value state to 0
  const [tabValue, setTabValue] = useState(0)
  // state for whole component
  let [
    {
      loginUsername, loginPassword, loginPasswordType, signupUsername,
      signupEmail, signupPassword, signupPasswordConfirm, signupPasswordType,
      signupPasswordConfirmType, loginCheck, signupCheck,
      // below is validations
      loginUsernameValidation, loginPasswordValidation, signupUsernameValidation,
      signupEmailValidation, signupPasswordValidation, signupPasswordConfirmValidation,
      // NOTE that signupPasswordValidation is is an object: { validationComponent: React.Component, error: Boolean }
    }, dispatch
  ] = useReducer(reducer, authState)

  function switchTab(_, newValue) {
    setTabValue(newValue)
  }

  let canProceedLogin = useMemo(() => (
    (Boolean(loginUsernameValidation) || Boolean(loginPasswordValidation)) ? false : true
  ), [loginUsernameValidation, loginPasswordValidation])

  let canProceedSignup = useMemo(() => (
    (Boolean(signupUsernameValidation) || Boolean(signupEmailValidation) || signupPasswordValidation.error || Boolean(signupPasswordConfirmValidation) || !signupCheck) ? false : true
  ), [signupUsernameValidation, signupPasswordConfirmValidation, signupEmailValidation, signupPasswordValidation, signupCheck])

  function handleChange(event, value) {
    // this function take value as action.type
    // refer to ../../state/auth
      dispatch({ type: value, value: event.target.value })
  }

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={3}>
            Will be hidden in xs
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={9}>
          <Tabs
            className={classes.tabs}
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            centered
            onChange={switchTab}
          >
            <Tab label="Login" />
            <Tab label="Sign up" />
          </Tabs>
          <div style={{ textAlign: 'center' }} >
            <div className={classes.socialButtonArea}>
              <SocialButton tooltip="with Facebook" socialName="facebook" size={36} />
              <SocialButton tooltip="with Google" socialName="google" size={36} />
              <SocialButton tooltip="with Twitter" socialName="twitter" size={36} />
            </div>
            <span style={{ color: '#aaa' }}>OR</span>
            <div style={{ padding: '0 60px 60px 60px', textAlign: 'left' }}>
              {tabValue === 0 &&
                // the component is login
                <Fragment>
                  <CustomInput
                    labelText="Username*"
                    id="loginUsername"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: loginUsername,
                      onBlur: () => handleChange(event, 0),
                    }}
                    error={Boolean(loginUsernameValidation)}
                  />
                  {Boolean(loginUsernameValidation) ? (
                    <FormHelperText error={true}>{loginUsernameValidation}</FormHelperText>
                  ) : null}
                  <CustomInput
                    labelText="Password*"
                    id="loginPassword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='login-password-visibility' onClick={() => dispatch({ type: 6 })}>
                          {loginPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: loginPasswordType,
                      defaultValue: loginPassword,
                      onBlur: () => handleChange(event, 1),
                    }}
                    error={Boolean(loginPasswordValidation)}
                  />
                  {Boolean(loginPasswordValidation) ? (
                    <FormHelperText error={true}>{loginPasswordValidation}</FormHelperText>
                  ) : null}
                  <FormControlLabel
                    className={classes.labelStyle}
                    control={
                      <Checkbox
                        id="loginCheck"
                        value="remember-me"
                        color="primary"
                        onChange={() => dispatch({ type: 9 })}
                        checked={loginCheck}
                      />
                    }
                    label="Remember me!"
                  />
                  <Mutation
                    mutation={TOKEN_AUTH}
                    variables={{ username: loginUsername, password: loginPassword }}
                  >
                    {(loginUser, { data, loading, error }) => (
                      <Fragment>
                        <Fab
                          variant="extended"
                          aria-label="login"
                          className={classes.btnStyle}
                          onClick={loginUser}
                          // check fields value validation status to determine button state
                          disabled={canProceedLogin ? false : true}
                        >
                          Let's GO
                        </Fab>
                        {loading ? console.log('loading') : null}
                        {data ? console.log(data) : null}
                        {error ? console.log(error) : null}
                      </Fragment>
                    )}
                  </Mutation>
                  <div style={{ justifyContent: 'center', paddingTop: '20px', display: 'flex' }}>
                    <a href="#" className={classes.forgotPassword}>Forgot username?</a>
                    <span>-</span>
                    <a href="#" className={classes.forgotPassword}>Forgot password?</a>
                  </div>
                </Fragment>
              }

              {tabValue === 1 &&
                <Fragment>
                  <CustomInput
                    labelText="Username*"
                    id="signupUsername"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: signupUsername,
                      onBlur: () => handleChange(event, 2),
                    }}
                    error={Boolean(signupUsernameValidation)}
                  />
                  {signupUsernameValidation ? (
                    <FormHelperText error={true}>{signupUsernameValidation}</FormHelperText>
                  ) : null}
                  <CustomInput
                    labelText="Email address*"
                    id="signupEmail"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      defaultValue: signupEmail,
                      onBlur: () => handleChange(event, 3),
                    }}
                    error={Boolean(signupEmailValidation)}
                  />
                  {signupEmailValidation ? (
                    <FormHelperText error={true}>{signupEmailValidation}</FormHelperText>
                  ) : null}
                  <CustomInput
                    labelText="Password*"
                    id="signupPassword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='signup-password-visibility' onClick={() => dispatch({ type: 7 })}>
                          {signupPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: signupPasswordType,
                      defaultValue: signupPassword,
                      onBlur: () => handleChange(event, 4),
                    }}
                    error={signupPasswordValidation.error}
                  />
                  <FormHelperText component="div">{signupPasswordValidation.validationComponent}</FormHelperText>
                  <CustomInput
                    labelText="Confirm Password*"
                    id="signupPasswordConfirm"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='signup-password-visibility' onClick={() => dispatch({ type: 8 })}>
                          {signupPasswordConfirmType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: signupPasswordConfirmType,
                      defaultValue: signupPasswordConfirm,
                      onBlur: () => handleChange(event, 5),
                    }}
                    error={Boolean(signupPasswordConfirmValidation)}
                  />
                  {signupPasswordConfirmValidation ? (
                    <FormHelperText error={true}>{signupPasswordConfirmValidation}</FormHelperText>
                  ) : null}
                  <FormControlLabel
                    className={classes.labelStyle}
                    control={
                      <Checkbox
                        id="signupCheck"
                        value="agree"
                        color="primary"
                        onChange={() => dispatch({ type: 10 })}
                        checked={signupCheck}
                      />
                    }
                    label="i Agree with Terms and Policies"
                  />
                  <Mutation
                    mutation={SIGNUP_USER}
                    variables={{ email: signupEmail, username: signupUsername, password1: signupPassword, password2: signupPasswordConfirm }}
                    onCompleted={data => console.log(data)}
                    onError={error => console.log(error)}
                  >
                    {(signupUser) => (
                      <Fab variant="extended"
                        aria-label="signup"
                        className={classes.btnStyle}
                        onClick={signupUser}
                        disabled={canProceedSignup ? false : true}
                      >
                        Sign Me Up
                      </Fab>
                    )}
                  </Mutation>
                </Fragment>
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Signing
