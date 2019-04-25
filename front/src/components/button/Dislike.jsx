import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { socialButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import classNames from 'classnames'
import ThumbDown from '@material-ui/icons/ThumbDown'


export default withStyles(socialButtonStyle)(
  class Disklike extends React.Component {

    render() {
      let { classes } = this.props
      let animateBool = this.props.animate

      return (
        <Zoom in={animateBool} style={{ transitionDelay: animateBool ? '400ms' : '0ms' }}>
          <Fab className={classNames(classes.fab34, classes.dislike)}>
            <Tooltip placement="top" title="Dislike">
              <ThumbDown className={classNames(classes.dislikeIcon, classes.icon)} />
            </Tooltip>
          </Fab>
        </Zoom>
      )
    }
  }
)
