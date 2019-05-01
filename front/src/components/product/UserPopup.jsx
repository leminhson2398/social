import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
  paper: {
    width: 230,
    height: 150,
    borderRadius: 2,

  },
})

class UserPopup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, anchorEl, open } = this.props

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={1}>
              <div>

              </div>
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
  anchorEl: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
}

export default withStyles(styles)(UserPopup)
