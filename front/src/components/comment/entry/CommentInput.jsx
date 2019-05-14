import React, { Fragment } from 'react'
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
    let files = event.currentTarget.files
    let { userUploadFile } = this.state
    let imageAsyncProcessor = new Promise((resolve, reject) => {
      // trible check file exist & file type is 'image/*' or not
      if (files && files[0] && /^(image\/)/.test(files[0].type)) {
        // check to prevent file duplication base on file size and file name
        if (userUploadFile.length && userUploadFile.some(image => image.name === files[0].name && image.size === files[0].size)) {
          reject(`File named ${files[0].name} does already exist.`)
        } else {
          let { fileReader } = this.classVars
          // check fileReader is defined or not
          if (fileReader === null || fileReader === 'undefined') {
            fileReader = new FileReader()
          }

          fileReader.onload = (event) => {
            resolve({ name: files[0].name, content: event.target.result, size: files[0].size })
          }
          try {
            fileReader.readAsDataURL(files[0])
          } catch (error) {
            reject(`Error occured: ${error}`)
          }
        }
      } else {
        reject(`Unexpected error`)
      }
    })
    imageAsyncProcessor.then(image => {
      this.setState({
        userUploadFile: userUploadFile.concat(image),
        openInputFile: true,
      })
      console.log(this.state)
    }).catch(error => console.error(error))
  }

  removeAnImage = name => {
    this.setState({
      userUploadFile: this.state.userUploadFile.filter(item => item.name !== name),
      openInputFile: Boolean(this.state.userUploadFile.length > 1)
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
          <Grid item sm={10} xs={12} container direction="column">
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
              <Fragment>
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
                          onClick={() => this.removeAnImage(item.name)}
                          title={`Delete ${item.name}`}
                        />
                      ) : null}
                      <img alt={item.name} title={item.name} src={item.content} className={classes.image} />
                    </span>
                  ))}
                </Grid>
              </Fragment>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={2} className={classes.rightPaperInput}>
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
