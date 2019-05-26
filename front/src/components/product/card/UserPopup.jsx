import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import avatar from '../../../static/img/shop-icon.png'
import Button from '@material-ui/core/Button'
import popupStyle from './popupStyle'
// icons
import { LocalOffer, LocationOn, BarChart } from '@material-ui/icons'


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
        placement="bottom-start"
        id="user-popup"
        {...other}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={1} className={classes.paper}>
              <Grid container justify="center" direction="column">
                <Grid item container style={{ padding: '8px', }}>
                  <Grid item>
                    <Avatar alt="hihi" src={avatar} className={classes.avatar} />
                  </Grid>
                  <Grid item style={{ marginLeft: '8px', }}>
                    <Typography className={classes.shopName}>Le Minh Son</Typography>
                    <table className={classes.table}>
                      <tbody>
                        <tr>
                          <td><LocalOffer className={classes.icon} /></td>
                          <td>Seller</td>
                        </tr>
                        <tr>
                          <td><LocationOn className={classes.icon} /></td>
                          <td>Hanoi</td>
                        </tr>
                        <tr>
                          <td><BarChart className={classes.icon} /></td>
                          <td>4.5/5</td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item style={{ textAlign: 'right', paddingTop: '8px', }}>
                  <Button size="small" color="primary" className={classes.button}>View Profile</Button>
                  <Button size="small" color="primary" className={classes.button}>Follow</Button>
                </Grid>
              </Grid>
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
