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
import SvgIcon from '@material-ui/core/SvgIcon'
// import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
// import style:
import editorStyle from './editor'
// import loading from '../../static/img/loading.gif'
// import icons
import { Edit, Menu, AttachMoney, Functions, Remove } from '@material-ui/icons'

class ProductEditor extends React.Component {
  constructor(props) {
    super(props)
    this.classVars = {
      fileReader: null,
    }
    this.state = {
      userUploadImages: [],
      openFileInputField: null,
    }
    this.imageFieldRef = React.createRef()
    this.today = null
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
            setTimeout(() => {
              resolve({ name: files[0].name, content: event.target.result, size: files[0].size })
            }, 1000)
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
      })
    }).catch(error => console.error(error))
  }

  removeAnImage = name => {
    this.setState({
      userUploadImages: this.state.userUploadImages.filter(item => item.name !== name)
    })
  }

  componentWillUnmount() {
    this.classVars.fileReader = null
  }

  handleFileCheckbox = event => {
    this.setState({ openFileInputField: Boolean(event.target.checked) })
  }

  // edit button click and focus title input
  focusTitleEdit = () => {
    document.getElementById('product-title-input').focus()
  }

  render() {
    let { classes } = this.props
    let { userUploadImages } = this.state
    let date = new Date()

    return (
      <Paper
        elevation={1}
        className={classes.editor}
      >
        <DialogTitle disableTypography={true}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="product-title-input">Product Title</InputLabel>
            <Input id="product-title-input"
              className={classes.productTitle}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label='Edit product title' color="primary" onClick={this.focusTitleEdit}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* <FormHelperText>Help text</FormHelperText> */}
            <FormHelperText className={classes.timeStamp}>{date.toUTCString().split(' ').slice(0, 4).join(' ')}</FormHelperText>
          </FormControl>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '24px', }}>
          <span aria-label="product-description-label" className={classes.producEditorLabels}>
            DESCRIPTION
          </span>
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
          <span aria-label="product-description-label" className={classes.producEditorLabels}>
            IMAGES
          </span>
          <Paper elevation={0} className={classes.editArea}>
            <Grid container direction="column">
              <Grid item>
                {userUploadImages.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', }} ref={this.imageFieldRef}>
                    {userUploadImages.map((image, index) => (
                      <ImageItem image={image} key={index} classes={classes} onClick={() => this.removeAnImage(image.name)} />
                    ))}
                  </div>
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
            <span aria-label="product-description-label" className={classes.producEditorLabels}>
              FILES
            </span>
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
        <DialogContent style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Pice" color='primary'>
              <AttachMoney />
            </IconButton>
            <InputBase placeholder='Price' type="number" />
          </Paper>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Sale off" color='primary'>
              <SvgIcon>
                <path d="M18.5,3.5L3.5,18.5L5.5,20.5L20.5,5.5M7,4A3,3 0 0,0 4,7A3,3 0 0,0 7,10A3,3 0 0,0 10,7A3,3 0 0,0 7,4M17,14A3,3 0 0,0 14,17A3,3 0 0,0 17,20A3,3 0 0,0 20,17A3,3 0 0,0 17,14Z" />
              </SvgIcon>
            </IconButton>
            <InputBase placeholder='Sale off' />
          </Paper>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Total Product" color='primary'>
              <SvgIcon>
                <path d="M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z" />
              </SvgIcon>
            </IconButton>
            <InputBase placeholder='Total products' type='number' />
          </Paper>
          <Paper elevation={0} className={classes.inputFields}>
            <IconButton aria-label="Menu" color='primary'>
              <Menu />
            </IconButton>
            <InputBase placeholder='Price' />
          </Paper>
        </DialogContent>
      </Paper>
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
            iconName='unpin'
            btnType='fab20'
            style={{ position: 'absolute', right: '-10px', top: '-10px', boxShadow: 'none' }}
            onClick={() => onClick()}
            title={`Unpin: ${image.name} ?`}
          />
        ) : null}
        <img alt={image.name} title={image.name} src={image.content} className={classes.image} />
      </span>
    )
  }
}

export default withStyles(editorStyle)(ProductEditor)
