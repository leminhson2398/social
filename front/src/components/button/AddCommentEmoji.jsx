import React from 'react'
import TagFaces from '@material-ui/icons/TagFaces'
import { commentButtonStyle } from '../../static/style/buttons'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'

export default withStyles(commentButtonStyle)(
  class AddCommentEmoji extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Fab color="default">
        </Fab>
      )
    }
  }
)