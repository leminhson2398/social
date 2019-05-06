import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import buttonStyle from './buttonStyle'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
// import icons
import {TagFaces, AddPhotoAlternate, Attachment, Close} from '@material-ui/icons'
module.children = {
  face: TagFaces,
  attachment: Attachment,
  addphoto: AddPhotoAlternate,
  close: Close,
}
/**
 * this file is used for comment entry
 * three buttons for uploading file, adding emoji, adding photos
 */

class CommentButton extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    this.props = null
  }

  render() {
    let { classes, tooltip, iconName, size, style, onClick } = this.props
    let Icon_ = module.children[`${iconName}`]
    let renderIcon = <Icon_ className={`${classes.iconCommon} ${classes[iconName + 'Icon']}`} />

    return (
      <Fab
        size="small"
        className={size ? classes[size] : classes.fab30}
        component="span"
        style={style ? style : null}
        onClick={onClick}
      >
        {tooltip ? (
          <Tooltip placement="top" title={tooltip}>
            {renderIcon}
          </Tooltip>
        ) :
          renderIcon
        }
      </Fab>
    )
  }
}

CommentButton.propTypes = {
  tooltip: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  style: PropTypes.any,
  onClick: PropTypes.func,
}

export default withStyles(buttonStyle)(CommentButton)
