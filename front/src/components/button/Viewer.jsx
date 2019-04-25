import React from 'react'
import ViewModule from '@material-ui/icons/ViewModule'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { socialButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'


export default withStyles(socialButtonStyle)(
  class Viewer extends React.Component {

    notifyEnnterToParent = () => {
      this.props.onMouseEnter
    }

    notifyLeaveToParent = () => {
      this.props.onMouseLeave
    }

    render() {
      let { classes } = this.props
      return (
        <Fab
          className={classNames(classes.fab34, classes.viewMore)}
          aria-label="View More"
          onMouseEnter={this.notifyEnnterToParent}
          onMouseLeave={this.notifyLeaveToParent}
        >
          <Tooltip placement="top" title="Actions">
            <ViewModule className={classes.viewIcon} />
          </Tooltip>
        </Fab>
      )
    }
  }
)
