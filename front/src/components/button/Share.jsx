import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import socialButtonStyle from '../../styles/button/social'
import Fab from '@material-ui/core/Fab'
import ShareIcon from '@material-ui/icons/Share'
import classNames from 'classnames'

export default withStyles(socialButtonStyle)(
  function Share(props) {
    let { classes } = props
    return (
      <Tooltip placement="top" title="Share">
        <Fab className={classNames(classes.fab34, classes.share)} aria-label="Share">
          <ShareIcon className={classNames(classes.icon, classes.commentIcon)} />
        </Fab>
      </Tooltip>
    )
  }
)


