import React from 'react'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { commentButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'


export default withStyles(commentButtonStyle)(
  class AddCommentImage extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      let { classes } = this.props
      return (
        <Fab className={classes.fab30} aria-label="Upload file">
          <Tooltip placement="top" title="Upload file">
            <CloudUpload
              className={classNames(classes.cloudUploadIcon, classes.iconColor)}
            />
          </Tooltip>
        </Fab>
      )
    }
  }
)
