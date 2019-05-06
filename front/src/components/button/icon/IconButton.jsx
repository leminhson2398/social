import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import iconButtonStyle from './style'
import { Visibility, BookmarkBorder, Share, Close } from '@material-ui/icons'
module.children = {
  share: Share,
  bookmark: BookmarkBorder,
  visibility: Visibility,
  close: Close,
}

/**
 * @param {string} variant - This param is defined in material-ui doc, 
 * it can be: ['text', 'contained', 'outlined'], default to 'contained'
 * @param {string} iconName - This param must be exactly lowercase format, 
 * eg: 'share', 'chat', ...
 * @param {string} btnType - Must be like 'fab34', 'fab30' or 'rec30'
 * @param {object} style - Additional style object, apply to <Button />
 * 
 * NOTE: Before using any icon, you must input it at the top of this file
 */

class ButtonIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, iconName, tooltip, tooltipPlacemment, variant, btnType, style } = this.props
    let Icon_ = module.children[iconName]
    let iconToRender = <Icon_ className={`${classes.iconCommon} ${classes[iconName + 'Icon']}`} />
    // 
    let ButtonOuter = /^(fab)/.test(btnType) ? Fab : Button

    return (
      <ButtonOuter
        variant={variant ? variant : "contained"}
        className={classes[btnType]}
        style={style ? style : null}
      >
        {tooltip ? (
          <Tooltip title={tooltip} placement={tooltipPlacemment ? tooltipPlacemment : "top"}>
            {iconToRender}
          </Tooltip>
        ) :
          iconToRender
        }
      </ButtonOuter>
    )
  }
}

ButtonIcon.propsTypes = {
  classes: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  tooltipPlacemment: PropTypes.string,
  variant: PropTypes.string,
  btnType: PropTypes.string.isRequired,
  style: PropTypes.any,
}

export default withStyles(iconButtonStyle)(ButtonIcon)
