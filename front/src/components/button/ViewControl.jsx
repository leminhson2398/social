import React from 'react'
import ViewModule from '@material-ui/icons/ViewModule'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import socialButtonStyle from '../../styles/button/social'
import Fab from '@material-ui/core/Fab'


export default withStyles(socialButtonStyle)(
  function ViewControl(props) {
    let { classes } = props
    return (
      <Tooltip placement="top" title="Actions">
        <Fab
          className={classNames(classes.fab34, classes.viewMore)}
          aria-label="View More"
        >
          <ViewModule className={classes.viewIcon} />
        </Fab>
      </Tooltip>
    )
  }
)
