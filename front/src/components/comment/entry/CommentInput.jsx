import React from 'react'
import Paper from '@material-ui/core/Paper'
// import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
// import classNames from 'classnames'
import CommentButton from './EntryButton'
import inputStyle from './inputStyle'
import Grid from '@material-ui/core/Grid'


class CommentInput extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes } = this.props
    return (
      <Paper elevation={1} className={classes.paperInput}>
        <Grid
          item xs={9}
          contentEditable={true}
          className={classes.leftPaperInput}
          role="textbox"
          spellCheck={true}
        ></Grid>
        <Grid item xs={3} className={classes.rightPaperInput}>
          {/* <input type="file" id="attach-a-file" /> */}
          <CommentButton iconName="attachment" tooltip="Attach a file" />
          <input accept="image/*" style={{ display: 'none' }} id="add-photo-file" type="file" />
          <label htmlFor="add-photo-file">
            <CommentButton iconName="addphoto" tooltip="Add an image" />
          </label>
          <CommentButton iconName="face" tooltip="Add an emoji" />
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(inputStyle)(CommentInput)
