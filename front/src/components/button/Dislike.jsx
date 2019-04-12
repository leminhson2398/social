import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import socialButtonStyle from '../../styles/button/social'
import Fab from '@material-ui/core/Fab'
import classNames from 'classnames'
import ThumbDown from '@material-ui/icons/ThumbDown'


export default withStyles(socialButtonStyle)(
  function Disklike(props) {
    let { classes } = props
    return (
      <Tooltip placement="top" title="Dislike">
        <Fab className={classNames(classes.fab34, classes.dislike)}>
          <ThumbDown className={classNames(classes.dislikeIcon, classes.icon)} />
        </Fab>
      </Tooltip>
    )
  }
)
