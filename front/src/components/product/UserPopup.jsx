import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import avatar from '../../static/img/avatar.png'
import Avatar from '@material-ui/core/Avatar'
import { Typography } from '@material-ui/core';


const popupStyle = () => ({
  popup: {
    flexGrow: 1,
    width: 230,
    height: 150,
  },
  avatar: {
    width: 68,
    height: 68,
    border: '2px solid #AEAEAE',
  },
})

export default withStyles(popupStyle)(
  class UserPopup extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      let { classes } = this.props
      return (
        <div className={classes.popup}>
          <Grid container>
            <Grid item xs={4} justify="center">
              <Avatar alt="minh son" src={avatar} className={classes.avatar}/>
            </Grid>
            <Grid item xs={8}>
              <Typography component="h4">
                Le Minh Son
              </Typography>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)
