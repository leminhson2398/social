import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import iconButtonStyle from './style'


class ButtonIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, iconName, tooltip, tooltipPlacemment, variant } = this.props
    let iconToRender = iconName ?
      <Icon className={`${classes.iconCommon} ${'hi'}`}>{iconName.toLowerCase()}</Icon> :
      <Icon className={classes.iconCommon}>404</Icon>

    return (
      <Button
        variant={variant}
      >
        {tooltip ? (
          <Tooltip placement={tooltipPlacemment ? tooltipPlacemment : "top"} title={tooltip}>
            {iconToRender}
          </Tooltip>
        ) : (
            iconToRender
          )}
      </Button>
    )
  }
}

ButtonIcon.propsTypes = {
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  tooltipPlacemment: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
}

export default withStyles(iconButtonStyle)(ButtonIcon)
