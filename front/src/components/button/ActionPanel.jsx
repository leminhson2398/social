import React from 'react'
import Paper from '@material-ui/core/Paper'
// import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Like from './Like'
import Comment from './Comment'
import Viewer from './Viewer'
import Dislike from './Dislike'
import Share from './Share'


const styles = () => ({
  paper: {
    height: 40,
    width: 40,
    maxWidth: 240,
    borderRadius: 20,
    padding: 3,
    display: '-webkit-flex',
    display: 'flex',
    justifyContent: 'space-between',
    '-webkit-transition': 'width 300ms linear',
    transition: 'width 300ms linear',
    '&:hover': {
      width: 250,
    },
  },
})

class ActionPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animateButtons: null
    }
  }

  render() {
    let { classes } = this.props
    let { animateButtons } = this.state
    return (
      <Paper
        elevation={1} className={classes.paper}
        onMouseEnter={() => this.setState({ animateButtons: true })}
        onMouseLeave={() => this.setState({ animateButtons: false })}
      >
        <Viewer
        // onClick={() => this.setState()}
        />
        <Like animate={animateButtons} />
        <Dislike animate={animateButtons} />
        <Comment animate={animateButtons} />
        <Share animate={animateButtons} />
      </Paper>
    )
  }
}

export default withStyles(styles)(ActionPanel)
