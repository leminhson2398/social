import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import iconButtonStyle from './style'
// import icons
import Share from '@material-ui/icons/Share'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'
import Visibility from '@material-ui/icons/Visibility'
module.children = { share: Share, bookmark: BookmarkBorder, visibility: Visibility }

/**
 * @param {string} variant - This param is defined in material-ui doc, 
 * it can be: ['text', 'contained', 'outlined'], default to 'contained'
 * @param {string} iconName - This param must be exactly format, 
 * eg: 'Share', 'Chat', ...
 * 
 * NOTE: Before using any icon, you must input it at the top of this file
 */

class ButtonIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, iconName, tooltip, tooltipPlacemment, variant } = this.props
    let Icon_ = module.children[`${iconName.toLowerCase()}`]
    let iconToRender = <Icon_ className={`${classes.iconCommon}`} />

    return (
      <Button
        variant={variant ? variant : "contained"}
        className={classes.rec30}
      >
        {tooltip ? (
          <Tooltip title={tooltip} placement={tooltipPlacemment ? tooltipPlacemment : "top"}>
            {iconToRender}
          </Tooltip>
        ) :
          iconToRender
        }
      </Button>
    )
  }
}

ButtonIcon.propsTypes = {
  classes: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  tooltipPlacemment: PropTypes.string,
  variant: PropTypes.string,
}

export default withStyles(iconButtonStyle)(ButtonIcon)
