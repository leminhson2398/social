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
 * @param {string} socialName - decide which social image to render.
 * @param {number} size - which size to use e.g: fab30, fab36
 */

class SocialButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, tooltip, tooltipPlacement, socialName, size } = this.props
    let socialImg = (
      <img
        src={require(`../../../static/img/${socialName.toLowerCase()}.png`)}
        alt={socialName}
      />
    )

    return (
      <Fab size="small" className={classNames(classes[`fab${String(size)}`], classes[socialName.toLowerCase()])}>
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
  socialName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default withStyles(socialButtonStyle)(SocialButton)
