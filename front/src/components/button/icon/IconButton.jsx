import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'


class ButtonIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, iconName, iconSide, tooltip, tooltipPlacemment, size, color, variant } = this.props

    return (
      <Button
        color={}
        variant={}
      >
        
      </Button>
    )
  }
}

ButtonIcon.propsTypes = {
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  tooltipPlacemment: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
}

export default withStyles()(ButtonIcon)
