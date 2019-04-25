import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Fab from '@material-ui/core/Fab'
import buttonStyle from './buttonStyle'
import Tooltip from '@material-ui/core/Tooltip'
import TagFaces from '@material-ui/icons/TagFaces'
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'
import Attachment from '@material-ui/icons/Attachment'
import PropTypes from 'prop-types'


class CommentButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, tooltip, iconName } = this.props
    iconName = String(iconName).toLowerCase()
    let renderIcon
    switch (iconName) {
      case 'face':
        renderIcon = <TagFaces className={classNames(classes.emojiIcon, classes.icon)} />
        break
      case 'attachment':
        renderIcon = <Attachment className={classNames(classes.icon, classes.attachmentIcon)} />
        break
      case 'addphoto':
        renderIcon = <AddPhotoAlternate className={classNames(classes.icon, classes.imageIcon)} />
        break
      default:
        renderIcon = <span>O</span>
        break
    }

    return (
      <Fab size="small" className={classes.fab30} component="span">
        {tooltip ? (
          <Tooltip placement="top" title={tooltip}>
            {renderIcon}
          </Tooltip>
        ) : (
            renderIcon
          )}
      </Fab>
    )
  }
}

CommentButton.propTypes = {
  tooltip: PropTypes.string,
  iconName: PropTypes.string.isRequired,
}

export default withStyles(buttonStyle)(CommentButton)
