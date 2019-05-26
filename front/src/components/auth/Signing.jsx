import React, { useState, useReducer, Fragment } from 'react'
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
import { mutationStore } from '../../lib/mutation'
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
      signupPasswordConfirmType, loginCheck, signupCheck
    }, dispatch
  ] = useReducer(reducer, authState)

  function switchTab(_, newValue) {
    setTabValue(newValue)
  }

  function handleChange(event, value) {
    // this function take value as action.type
    // refer to ../../state/auth
    dispatch({ type: value, value: event.target.value })
  }

  function changePwdType(_, value) {
    // this function is for changing password input type
    dispatch({ type: value })
  }

  function handleCheckboxStatus(_, value) {
    // this function is for checkbox status
    dispatch({ type: value })
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
            <div style={{ display: 'flex', flexWrap: 'nowrap', width: '150px', justifyContent: 'space-around', margin: '0 auto 20px auto', }}>
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
                    id="login-username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: loginUsername,
                      onBlur: () => handleChange(event, 0),
                    }}
                    error={true}
                  />
                  <FormHelperText error={true}>hihi</FormHelperText>
                  <CustomInput
                    labelText="Password*"
                    id="login-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='login-password-visibility' onClick={() => changePwdType(event, 6)}>
                          {loginPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: loginPasswordType,
                      defaultValue: loginPassword,
                      onBlur: () => handleChange(event, 1),
                    }}
                  />
                  <FormControlLabel
                    className={classes.labelStyle}
                    control={
                      <Checkbox
                        value="remember-me"
                        color="primary"
                        onChange={() => handleCheckboxStatus(event, 9)}
                        checked={loginCheck}
                      />
                    }
                    label="Remember me!"
                  />
                  <Mutation mutation={mutationStore('token_auth')}
                    variables={{ username: loginUsername, password: loginPassword }}
                    onCompleted={data => console.log(data)}
                    onError={error => console.log(error)}
                  >
                    {(tokenAuth) => (
                      <Fab
                        variant="extended"
                        aria-label="login"
                        className={classes.btnStyle}
                        onClick={tokenAuth}
                      >
                        Let's GO
                        </Fab>
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
                    id="signup-username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: signupUsername,
                      onBlur: () => handleChange(event, 2),
                    }}
                  />
                  <CustomInput
                    labelText="Email address*"
                    id="signup-email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      defaultValue: signupEmail,
                      onBlur: () => handleChange(event, 3),
                    }}
                  />
                  <CustomInput
                    labelText="Password*"
                    id="signup-password1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='signup-password-visibility' onClick={() => changePwdType(event, 7)}>
                          {signupPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: signupPasswordType,
                      defaultValue: signupPassword,
                      onBlur: () => handleChange(event, 4),
                    }}
                  />
                  <CustomInput
                    labelText="Confirm Password*"
                    id="signup-password2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (<InputAdornment position="end">
                        <IconButton aria-label='signup-password-visibility' onClick={() => changePwdType(event, 8)}>
                          {signupPasswordConfirmType === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                      type: signupPasswordConfirmType,
                      defaultValue: signupPasswordConfirm,
                      onBlur: () => handleChange(event, 5),
                    }}
                  />
                  <FormControlLabel
                    className={classes.labelStyle}
                    control={
                      <Checkbox
                        value="agree"
                        color="primary"
                        onChange={() => changePwdType(event, 10)}
                        checked={signupCheck}
                      />
                    }
                    label="i Agree with Terms and Policies"
                  />
                  <Mutation mutation={mutationStore('create_user')}
                    // create new user mutation
                    variables={{ email: signupEmail, username: signupUsername, password1: signupPassword, password2: signupPasswordConfirm }}
                    onCompleted={data => console.log(data)}
                    onError={error => console.log(error)}
                  >
                    {(createUser) => (
                      <Fab variant="extended"
                        aria-label="signup"
                        className={classes.btnStyle}
                        onClick={createUser}
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
