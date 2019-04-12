import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import socialButtonStyle from '../../styles/button/social'
import Fab from '@material-ui/core/Fab'
import Favorite from '@material-ui/icons/Favorite'
import classNames from 'classnames'

export default withStyles(socialButtonStyle)(
  function Like(props) {
    let { classes } = props
    return (
      <Tooltip placement="top" title="Like">
        <Fab className={classes.fab34} color="secondary">
          <Favorite className={classNames(classes.likeIcon, classes.icon)}/>
        </Fab>
      </Tooltip>
    )
  }
)
