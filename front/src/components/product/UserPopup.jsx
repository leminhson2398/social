import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import popupStyle from './popupStyle'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import avatar from '../../static/img/shop-icon.png'


class UserPopup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, anchorEl, open, ...other } = this.props

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom"
        id="user-popup"
        {...other}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={1} className={classes.paper}>
              <Grid container spacing={16} justify="center" alignItems="center">
                <Grid item>
                  <Avatar alt="hihi" src={avatar} className={classes.avatar}/>
                </Grid>
                <Grid item>

                </Grid>
              </Grid>
              <Divider />
              <div>

              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    )
  }
}

UserPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
}

export default withStyles(popupStyle)(UserPopup)
