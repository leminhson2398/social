import React from 'react'
import Paper from '@material-ui/core/Paper'
// import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Like from '../button/Like'
import Comment from '../button/Comment'
import ViewControl from '../button/ViewControl'
import Dislike from '../button/Dislike'
import Share from '../button/Share'


const styles = () => ({
  paper: {
    height: 40,
    width: 40,
    maxWidth: 250,
    borderRadius: 20,
    padding: 3,
    display: '-webkit-flex',
    display: 'flex',
    justifyContent: 'space-between',
    '-webkit-transition': 'width 250ms ease-out',
    transition: 'width 500ms ease-out',
    '&:hover': {
      width: 250,
    },
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
        elevation={1} className={classes.paper}
        // onMouseOver={() => console.log('over')}
      >
        <ViewControl/>
        <Like />
        <Dislike />
        <Comment />
        <Share />
      </Paper>
    )
  }
}

export default withStyles(styles)(ActionPanel)
