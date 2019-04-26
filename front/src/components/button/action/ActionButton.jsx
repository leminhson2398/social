import React from 'react'
import Fab from '@material-ui/core/Fab'
import actionStyle from './style'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Favorite from '@material-ui/icons/Favorite'
import classNames from 'classnames'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Share from '@material-ui/icons/Share'
import Chat from '@material-ui/icons/Chat'
import PropTypes from 'prop-types'
import { Icon } from '@material-ui/core'
import ViewModule from '@material-ui/icons/ViewModule'

/**
 * This component is used for performing some operations like like, comment, dislike
 * The iconName props must be exactly typed, otherwise, you won't be able to render desired output
 * @param {string} tooltip - tooltip to render
 * @param {string} tooltipPlacement - where to place tooltip, must be ['top', 'bottom', ...]
 * @param {string} iconName - icon to render to screen, must be of ['like', 'dislike', 'comment', 'share', 'viewmore']
 * @param {bool} border - whether to render '2px solid #ffffff' border to the screen
 * @param {number} size - will be convert to `fab${String(size)}` in order to render
 */

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, tooltip, tooltipPlacement, iconName, border, size } = this.props
    let borderClass = border ? classes.border : null// Whether to render border or not
    let iconToRender

    switch (iconName.toLowerCase()) {
      case 'like':
        iconToRender = <Favorite className={`${classes.likeIcon} ${classes.iconCommon}`} />
        // iconToRender = React.createElement(eval('Favorite'), {className: `${classes.likeIcon} ${classes.iconCommon}`})
        break
      case 'dislike':
        iconToRender = <ThumbDown className={`${classes.dislikeIcon} ${classes.iconCommon}`} />
        break
      case 'comment':
        iconToRender = <Chat className={`${classes.commentIcon} ${classes.iconCommon}`} />
        break
      case 'share':
        iconToRender = <Share className={`${classes.shareIcon} ${classes.iconCommon}`} />
        break
      case 'viewmore':
        iconToRender = <ViewModule className={`${classes.viewmoreIcon}`} />
        break
      default:
        iconToRender = <Icon>O</Icon>
        break
    }

    return (
      <Fab
        className={classNames(classes[`fab${String(size)}`], classes[iconName.toLowerCase()], borderClass)}
      >
        {tooltip ? (
          <Tooltip
            placement={tooltipPlacement ? tooltipPlacement : "top"}
            title={tooltip}
          >
            {iconToRender}
          </Tooltip>
        ) : (
            iconToRender
          )}
      </Fab>
    )
  }
}

ActionButton.propTypes = {
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  border: PropTypes.bool,
  size: PropTypes.number,
}

export default withStyles(actionStyle)(ActionButton)
