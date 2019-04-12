import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import socialButtonStyle from '../../styles/button/social'
import Fab from '@material-ui/core/Fab'
import classNames from 'classnames'
import Chat from '@material-ui/icons/Chat'

export default withStyles(socialButtonStyle)(
  function Comment(props) {
    let { classes } = props
    return (
      <Tooltip placement="top" title="Comment">
        <Fab className={`${classes.fab34} ${classes.comment}`}>
          <Chat className={classNames(classes.icon, classes.commentIcon)} />
        </Fab>
      </Tooltip>
    )
  }
)
