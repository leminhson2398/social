import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormHelperText from '@material-ui/core/FormHelperText'
import DialogContent from '@material-ui/core/DialogContent'
import ButtonIcon from '../button/icon/IconButton'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
// import style:
import editorStyle from './editor'
// import icons
import { Edit } from '@material-ui/icons'

class ProductEditor extends React.Component {
  constructor(props) {
    super(props)
    this.classVars = {
      fileReader: null,
    }
    this.state = {
      userUploadImages: [],
      openImageInput: null,
      openFileInputField: null,
    }
  }

  processImage = (event) => {
    let files = event.currentTarget.files
    let { userUploadImages } = this.state
    let imageAsyncProcessor = new Promise((resolve, reject) => {
      // trible check file exist & file type is 'image/*' or not
      if (files && files[0] && /^(image\/)/.test(files[0].type)) {
        // check to prevent file duplication base on file size and file name
        if (userUploadImages.length && userUploadImages.some(image => image.name === files[0].name && image.size === files[0].size)) {
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
            reject(`Error occured: ${error} while reading image file.`)
          }
        }
      } else {
        reject(`Unexpected error`)
      }
    })
    imageAsyncProcessor.then(image => {
      this.setState({
        userUploadImages: userUploadImages.concat(image),
        openImageInput: true
      })
      console.log(this.state)
    }).catch(error => console.error(error))
  }

  removeAnImage = name => {
    this.setState({
      userUploadImages: this.state.userUploadImages.filter(item => item.name !== name)
    })
  }

  componentWillUnmount() {
    this.setState({ userUploadImages: [], openImageInput: false })
    this.classVars.fileReader = null
  }

  handleFileCheckbox = event => {
    this.setState({ openFileInputField: Boolean(event.target.checked) })
  }

  render() {
    let { classes } = this.props
    let { userUploadImages, openImageInput } = this.state
    let date = new Date()

    return (
      <Paper
        elevation={1}
        className={classes.editor}
      >
        <DialogTitle disableTypography={true}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">Product Title</InputLabel>
            <Input id="component-simple"
              className={classes.productTitle}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label='Edit product title'>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* <FormHelperText>Help text</FormHelperText> */}
            <FormHelperText className={classes.timeStamp}>{date.toUTCString().split(' ').slice(0, 4).join(' ')}</FormHelperText>
          </FormControl>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '24px' }}>
          <Paper elevation={0} className={classes.editArea}>
            <Grid container direction="column">
              <Fragment>
                <Grid
                  item
                  className={classes.descriptionArea}
                  contentEditable={true}
                  spellCheck={true}
                  role='textbox'
                  tabIndex={0}
                />
              </Fragment>
              <Grid item style={{ textAlign: 'right' }}>
                <ButtonIcon iconName='face' btnType='fab30' tooltip='Add emoji' />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogContent>
          <Paper elevation={0} className={classes.editArea}>
            <Grid container direction="column">
              <Grid item container>
                {openImageInput ? (
                  <Fragment>
                    {userUploadImages.map((image, index) => (
                      <ImageItem image={image} key={index} classes={classes} onClick={() => this.removeAnImage(image.name)} />
                    ))}
                  </Fragment>
                ) : null}
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <input type='file' accept="image/*" style={{ display: 'none' }} id="product-add-image" onChange={this.processImage} />
                <label htmlFor="product-add-image">
                  <ButtonIcon iconName='photo' btnType='fab30' tooltip='Add photo' />
                </label>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogContent
          style={{ paddingBottom: 'unset' }}
        >
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.handleFileCheckbox}
                value="openFileInput"
                color="primary"
              />
            }
            label="I have some related files"
          />
        </DialogContent>
        {this.state.openFileInputField ? (
          <DialogContent>
            <Paper elevation={0} className={classes.editArea}>
              <Grid container direction="column">
                <Grid item>

                </Grid>
                <Grid item style={{ justifyContent: 'flex-end', alignItems: 'center' }} container>
                  <span style={{ fontSize: '10px', color: '#979797', fontWeight: 'bold' }}>(2 Mb or below)</span>
                  <ButtonIcon iconName='attachment' btnType='fab30' tooltip='Attach some files' />
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>
        ) : null}
        <InputFields />
      </Paper>
    )
  }
}


class InputFields extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: {value: null, error: null},
      sale: {value: 0, error: null},
      products: {value: 0, error: null},
      
    }
  }

  render() {
    let { price, sale } = this.state

    return (
      <DialogContent style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <TextField
          label="Price"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="Sale Percent"
          margin="dense"
          variant="filled"
          type="number"
          defaultValue={sale}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
        <TextField
          label="Total Products Left"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="Multiline Placeholder"
          margin="dense"
          variant="filled"
        />
      </DialogContent>
    )
  }
}


class ImageItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closeBtn: null,
    }
  }

  render() {
    let { classes, image, onClick } = this.props
    return (
      <span
        className={classes.imageSpan}
        onMouseEnter={() => this.setState({ closeBtn: true })}
        onMouseLeave={() => this.setState({ closeBtn: false })}
      >
        {this.state.closeBtn ? (
          <ButtonIcon
            iconName='close'
            btnType='fab20'
            style={{ position: 'absolute', right: '-10px', top: '-10px', boxShadow: 'none' }}
            onClick={() => onClick()}
            title={`delete ${image.name}`}
          />
        ) : null}
        <img alt={image.name} title={image.name} src={image.content} className={classes.image} />
      </span>
    )
  }
}

export default withStyles(editorStyle)(ProductEditor)
