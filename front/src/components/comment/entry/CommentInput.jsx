import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import CommentButton from './EntryButton'
import inputStyle from './inputStyle'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
/**
 * userUploadFile contains objects:
 * format: {name: string, size: int, content: string}
 */

class CommentInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userUploadFile: [],
      openInputFile: false,
      displayClose: null,
    }
    this.classVars = {
      fileReader: null,
    }
  }

  processImage = (event) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      let { fileReader } = this.classVars
      let { userUploadFile } = this.state
      let inputFile = event.currentTarget.files[0]

      // Check file type is actually 'image/*' or not
      if (/^(image\/)/.test(inputFile.type)) {
        if (fileReader === null) {
          fileReader = new FileReader()
        }

        fileReader.onload = (event) => {
          // check already uploaded files, to avoid file duplication
          if (userUploadFile.length && userUploadFile.some(image => image.name === inputFile.name && image.size === inputFile.size)) {
            console.log(Error(`File named: ${inputFile.name} does already exist.`))
            return
          }
          this.setState({
            userUploadFile: userUploadFile.concat(
              { name: inputFile.name, content: event.target.result, size: inputFile.size }
            ),
            openInputFile: true,
          })
        }

        fileReader.readAsDataURL(inputFile)
      } else {
        console.log(Error(`Unexpected file type: ${inputFile.type}`))
      }
    }
  }

  removeAnImage = (index) => {
    let remainImages = this.state.userUploadFile.filter((item, i) => i !== index)
    this.setState({
      userUploadFile: remainImages,
      openInputFile: Boolean(remainImages.length)
    })
  }

  componentWillUnmount() {
    this.setState({ userUploadFile: [], openInputFile: false })
    this.classVars.fileReader = null
  }

  render() {
    let { classes } = this.props
    let { userUploadFile, openInputFile } = this.state

    return (
      <Paper className={classes.paperInput} elevation={1}>
        <Grid container>
          <Grid item xs={10} container direction="column">
            <Grid item container style={{ padding: '12px' }}>
              <Grid
                item xs={12}
                contentEditable={true}
                role="textbox"
                spellCheck={true}
                className={classes.leftPaperInput}
              />
            </Grid>
            {openInputFile ? (
              // check are there any file uploaded.
              <React.Fragment>
                <Divider />
                <Grid item className={classes.ItemUploadContainer} container>
                  {userUploadFile.map((item, index) => (
                    <span key={index} className={classes.imageSpan}
                      onMouseEnter={() => this.setState({ displayClose: true })}
                      onMouseLeave={() => this.setState({ displayClose: false })}
                    >
                      {this.state.displayClose ? (
                        <CommentButton
                          size='fab20'
                          iconName='close'
                          style={{ position: 'absolute', right: '-10px', top: '-10px' }}
                          onClick={() => this.removeAnImage(index)}
                        />
                      ) : null}
                      <img alt={item.name} title={item.name} src={item.content} className={classes.image} />
                    </span>
                  ))}
                </Grid>
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item xs={2} className={classes.rightPaperInput}>
            {/* <CommentButton iconName="attachment" tooltip="Attach a file" /> */}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="add-photo-file"
              type="file"
              onChange={(event) => this.processImage(event)}
            />
            <label htmlFor="add-photo-file">
              <CommentButton iconName="addphoto" tooltip="Add an image" />
            </label>
            <CommentButton iconName="face" tooltip="Add an emoji" />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(inputStyle)(CommentInput)
