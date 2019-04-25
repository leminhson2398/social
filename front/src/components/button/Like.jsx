import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { socialButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import Favorite from '@material-ui/icons/Favorite'
import classNames from 'classnames'

export default withStyles(socialButtonStyle)(
  class Like extends React.Component {

    render() {
      let { classes } = this.props
      let animateBool = this.props.animate
      return (
        <Zoom in={animateBool} style={{ transitionDelay: animateBool ? '350ms' : '0ms' }}>
          <Fab className={classes.fab34} color="secondary">
            <Tooltip placement="top" title="Like">
              <Favorite className={classNames(classes.likeIcon, classes.icon)} />
            </Tooltip>
          </Fab>
        </Zoom>
      )
    }
  }
)
