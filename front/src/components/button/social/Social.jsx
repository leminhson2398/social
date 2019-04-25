import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import socialButtonStyle from './style'
import PropTypes from 'prop-types'

/**
 * SocialButton doc
 * @param {string} tooltip - whether to render Tooltip.
 * @param {string} tooltipPlacement - where to place tooltip.
 * @param {string} social - decide which social image to render.
 * @param {string} size - which size to use e.g: fab30, fab36
 */

class SocialButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, tooltip, tooltipPlacement, social, size } = this.props
    let socialImg = (
      <img
        src={require(`../../../static/img/${social.toLowerCase()}.png`)}
        alt={social}
      />
    )
    size = classes['fab' + String(size)]

    return (
      <Fab size="small" className={classNames(size, classes[social])}>
        {tooltip ? (
          <Tooltip placement={tooltipPlacement ? tooltipPlacement : 'top'} title={tooltip}>
            {socialImg}
          </Tooltip>
        ) :
          socialImg
        }
      </Fab>
    )
  }
}

SocialButton.propTypes = {
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  social: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default withStyles(socialButtonStyle)(SocialButton)
