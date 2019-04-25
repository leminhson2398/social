import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { socialButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import classNames from 'classnames'
import Chat from '@material-ui/icons/Chat'


export default withStyles(socialButtonStyle)(
  class Comment extends React.Component {

    render() {
      let { classes } = this.props
      let animateBool = this.props.animate

      return (
        <Zoom in={animateBool} style={{ transitionDelay: animateBool ? '450ms' : '0ms' }}>
          <Fab className={`${classes.fab34} ${classes.comment}`}>
            <Tooltip placement="top" title="Comment">
              <Chat className={classNames(classes.icon, classes.commentIcon)} />
            </Tooltip>
          </Fab>
        </Zoom>
      )
    }
  }
)
