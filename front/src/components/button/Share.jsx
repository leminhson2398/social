import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { socialButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import ShareIcon from '@material-ui/icons/Share'
import classNames from 'classnames'


export default withStyles(socialButtonStyle)(
  class Share extends React.Component {

    render() {
      let { classes } = this.props
      let animateBool = this.props.animate

      return (
        <Zoom in={animateBool} style={{ transitionDelay: animateBool ? '500ms' : '0ms' }}>
          <Fab className={classNames(classes.fab34, classes.share)} aria-label="Share">
            <Tooltip placement="top" title="Share">
              <ShareIcon className={classNames(classes.icon, classes.commentIcon)} />
            </Tooltip>
          </Fab>
        </Zoom>
      )
    }
  }
)


