import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import SocialButton from '../button/social/Social'
import classNames from 'classnames'


const panelStyle = () => ({
  panel: {
    height: 36,
    width: 0,
    display: '-webkit-flex',
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: 200,
    borderRadius: 4,
    padding: 3,
  },
})

class ActionPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes } = this.props
    return (
      <Paper
        elevation={1}
        className={classNames(classes.panel)}
      >
        <SocialButton tooltip="Facebook" social="facebook" size={30} />
        <SocialButton tooltip="Twitter" social="twitter" size={30} />
        <SocialButton tooltip="Pinterest" social="pinterest" size={30} />
        <SocialButton tooltip="Embeded URL" social="embed" size={30} />
      </Paper>
    )
  }
}


export default withStyles(panelStyle)(ActionPanel)
