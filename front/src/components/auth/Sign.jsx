import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
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
// import icons
import { Visibility, VisibilityOff } from '@material-ui/icons'
// import styles
import authStyle from './authStyle'
// redux example
import { connect } from 'react-redux'
// import mutationStore
import { mutationStore } from '../../lib/mutation'
import { Mutation } from 'react-apollo'


function authStateWrapper(state) {
  return {
    authState: state.authState
  }
}

class Signing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabValue: 0,
    }
  }

  changeTab = (event, tabValue) => {
    this.setState({ tabValue })
  }

  handleChange = (event, value) => {
    // value must follows convention, refer to 'src\state\Auth.js'
    this.props.dispatch({ id: value, value: event.target.value, type: 'change' })
  }

  changePwdType = (event, value) => {
    // NOTE: This function is used for both password visibility and chekbox state too
    this.props.dispatch({ id: value, type: 'change' })
  }

  render() {
    let { root, tabs, btnStyle, labelStyle, forgotPassword } = this.props.classes
    let {
      loginUsername, loginPassword, signupUsername, signupEmail, signupPassword, loginCheck,
      signupPasswordConfirm, loginPasswordType, signupPasswordType, signupPasswordConfirmType,
      signupCheck,
    } = this.props.authState
    let { tabValue } = this.state
    console.log(this.props)

    return (
      <Paper elevation={1} className={root}>
        <Grid container>
          <Hidden xsDown>
            <Grid item sm={3}>
              hihihi
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={9}>
            <Tabs
              className={tabs}
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              centered
              onChange={this.changeTab}
            >
              <Tab label="Login" />
              <Tab label="Sign up" />
            </Tabs>
            <div style={{ textAlign: 'center' }}>
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
                        onChange: () => this.handleChange(event, 0),
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
                          <IconButton aria-label='login-password-visibility' onClick={() => this.changePwdType(event, 6)}>
                            {loginPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>),
                        type: loginPasswordType,
                        defaultValue: loginPassword,
                        onChange: () => this.handleChange(event, 1),
                      }}
                    />
                    <FormControlLabel
                      className={labelStyle}
                      control={
                        <Checkbox
                          value="remember-me"
                          color="primary"
                          onChange={() => this.changePwdType(event, 9)}
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
                          className={btnStyle}
                          onClick={tokenAuth}
                        >
                          Let's GO
                        </Fab>
                      )}
                    </Mutation>
                    <div style={{ justifyContent: 'center', paddingTop: '20px', display: 'flex' }}>
                      <a href="#" className={forgotPassword}>Forgot username?</a>
                      <span>-</span>
                      <a href="#" className={forgotPassword}>Forgot password?</a>
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
                        onChange: () => this.handleChange(event, 2),
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
                        onChange: () => this.handleChange(event, 3),
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
                          <IconButton aria-label='signup-password-visibility' onClick={() => this.changePwdType(event, 7)}>
                            {signupPasswordType === 'password' ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>),
                        type: signupPasswordType,
                        defaultValue: signupPassword,
                        onChange: () => this.handleChange(event, 4),
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
                          <IconButton aria-label='signup-password-visibility' onClick={() => this.changePwdType(event, 8)}>
                            {signupPasswordConfirmType === 'password' ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>),
                        type: signupPasswordConfirmType,
                        defaultValue: signupPasswordConfirm,
                        onChange: () => this.handleChange(event, 5),
                      }}
                    />
                    <FormControlLabel
                      className={labelStyle}
                      control={
                        <Checkbox
                          value="agree"
                          color="primary"
                          onChange={() => this.changePwdType(event, 10)}
                          checked={signupCheck}
                        />
                      }
                      label="i Agree with Terms and Policies"
                    />
                    <Mutation mutation={mutationStore('create_user')}
                      // create new user mutation
                      variables={{ email: signupEmail, username: signupUsername, password1: signupPassword, password2: signupPasswordConfirm }}
                      onCompleted={data => console.log(data)}
                      onError={error => console.log(error.errors)}
                    >
                      {(createUser) => (
                        <Fab variant="extended"
                          aria-label="signup"
                          className={btnStyle}
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
}

export default withStyles(authStyle)(
  connect(authStateWrapper)(Signing)
)
