import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import SocialButton from '../button/social/Social'
import classNames from 'classnames'


const socialSharing = () => ({
  socialSharePanel: {
    height: 36,
    width: 180,
    display: '-webkit-flex',
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: 200,
    borderRadius: 4,
    padding: 3,
  },
})
const socials = [
  { tooltip: 'Facebook', socialName: 'facebook', size: 30 },
  { tooltip: 'Twitter', socialName: 'twitter', size: 30 },
  { tooltip: 'Pinterest', socialName: 'pinterest', size: 30 },
  { tooltip: 'Embeded URL', socialName: 'embed', size: 30 },
]

class socialSharePanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, customStyle } = this.props
    return (
      <Paper
        style={customStyle ? customStyle : null}
        elevation={1}
        className={classNames(classes.socialSharePanel)}
      >
        {socials.map((item, index) => 
          <SocialButton key={index} tooltip={item.tooltip} socialName={item.socialName} size={item.size} />
        )}
      </Paper>
    )
  }
}

export default withStyles(socialSharing)(socialSharePanel)
