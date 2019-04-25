import React, { Fragment } from 'react'
import Croppie from 'croppie'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import 'croppie/croppie.css'


const styles = () => ({
  button: {
    margin: 8,
  },
  input: {
    display: 'none'
  }
})

class ImageCropper extends React.Component {
  constructor(props) {
    super(props)
    // The Ref below will be used for binding croppie Instance
    this.cropperRef = React.createRef()
    this.classVars = {
      fileReader: null,
      ImageCropper: null
    }
    this.state = {
      openSnackbar: false,
      vertical: 'bottom',
      horizontal: 'left',
      message: null
    }
  }

  initializeCropper = (evt) => {
    this.classVars.fileReader = new FileReader()
    if (this.classVars.ImageCropper === null) {
      this.classVars.ImageCropper = new Croppie(
        this.cropperRef.current,
        {
          viewport: { width: 150, height: 150 },
          boundary: { width: 250, height: 250 },
          showZoomer: true,
          enableZoom: true,
        }
      )
    }

    if (evt.currentTarget.files && evt.currentTarget.files[0]) {
      this.classVars.fileReader.onload = (evt) => {
        this.classVars.ImageCropper.bind({
          url: evt.target.result,
          orientation: 4
        })
      }
      this.classVars.fileReader.readAsDataURL(evt.currentTarget.files[0])
    }
  }

  cropImage = () => {
    if (this.classVars.ImageCropper) {
      this.classVars.ImageCropper.result({
        type: 'base64',
        format: 'jpeg',
        quality: 0.85
      }).then((imageData) => {
        console.log(imageData)
      })
    } else {
      this.setState({
        openSnackbar: true,
        message: 'you have not uploaded an image yet.'
      })
    }
  }

  componentWillUnmount() {
    Object.keys(this.classVars).map(item => this.classVars[item] = null)
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason !== 'clickaway') this.setState({ openSnackbar: false })
  }

  render() {
    let { classes } = this.props
    let { vertical, horizontal, openSnackbar, message } = this.state
    return (
      <Fragment>
        <div
          ref={this.cropperRef}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={this.initializeCropper}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span" className={classes.button}>
            <PhotoCamera />
          </IconButton>
        </label>
        <IconButton color="inherit" component="span" className={classes.button} onClick={this.cropImage}>
          <AddAPhoto />
        </IconButton>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.handleCloseSnackbar}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
          autoHideDuration={4000}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(ImageCropper)
