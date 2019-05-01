import React from 'react'
import Fab from '@material-ui/core/Fab'
import actionStyle from './style'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// import icons
import ViewModule from '@material-ui/icons/ViewModule'
import Share from '@material-ui/icons/Share'
import Chat from '@material-ui/icons/Chat'
import Favorite from '@material-ui/icons/Favorite'
import ThumbDown from '@material-ui/icons/ThumbDown'
module.children = {
  like: Favorite,
  dislike: ThumbDown,
  comment: Chat,
  share: Share,
  viewmore: ViewModule
}

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
    let Icon_ = module.children[`${iconName.toLowerCase()}`]
    let iconToRender = <Icon_ className={`${classes[`${iconName}Icon`]} ${iconName !== 'viewmore' ? classes.iconCommon : null}`} />


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
